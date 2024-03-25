import { Injectable } from '@nestjs/common';
import { ApiPrismaService } from '@nx-demo/api-prisma';
import { IComment, IVideoMetadata, IVideoMetadataDetail } from '@nx-demo/shared-domain';
import { PrismaExcludeUtil } from '@nx-demo/shared-utils';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { Readable } from 'stream';
import { Observable, Subject } from 'rxjs';
import { randomUUID } from 'crypto';
import { Prisma, Video } from '@prisma/client';
import ffmpegPath from 'ffmpeg-static';
import fluentFfmpeg from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs';

type PostVideoProgress = {
  type: 'converting', percent: number
} | {
  type: 'uploading', percent: number
} | {
  type: 'completed', videoUuid: string
};

@Injectable()
export class ApiWatchService {

  constructor(
    private apiPrismaService: ApiPrismaService,
    private configService: ConfigService,
  ) { }

  async getVideoMetadata(videoKey: string): Promise<IVideoMetadataDetail | null> {
    const video = await this.apiPrismaService.video.findUnique({
      where: {
        uuid: videoKey,
      },
      include: {
        _count: {
          select: {
            // コメント数
            comments: true,
            // いいね数
            reactions: {
              where: {
                kind: 'LIKE',
              }
            },
          }
        },
        uploader: {
          include: {
            _count: {
              select: {
                // チャンネル登録者数
                channelSubscribers: true,
              }
            }
          }
        },
      }
    });

    if (video == null) return null;

    return {
      ...video,
      commentCount: video._count.comments,
      likeCount: video._count.reactions,
      uploader: {
        ...video.uploader,
        channelSubscriberCount: video.uploader._count.channelSubscribers,
      },
    };
  }

  async getVideoComments(videoKey: string, offset: number, parentCommentId?: number): Promise<IComment[]> {
    const videoComments = await this.apiPrismaService.comment.findMany({
      where: {
        videoUuid: videoKey,
        parentComment: parentCommentId ? { id: parentCommentId } : null,
      },
      include: {
        _count: {
          select: {
            childComments: true,
          }
        },
        commenter: {
          select: PrismaExcludeUtil.userWithoutPassword,
        },
        video: {
          select: {
            _count: {
              select: {
                reactions: {
                  where: {
                    kind: 'LIKE',
                  }
                }
              }
            }
          }
        }
      },
    });

    return videoComments.map(videoComment => {
      return {
        ...videoComment,
        likeCount: videoComment.video._count.reactions,
        childCommentCount: videoComment._count.childComments,
      };
    });
  }

  async getRelatedVideos(videoKey: string, offset: number): Promise<IVideoMetadata[]> {
    // TODO: 将来的に機械学習で関連動画を取得するようにする
    const videos = await this.apiPrismaService.video.findMany({
      include: {
        uploader: {
          select: PrismaExcludeUtil.userWithoutPassword,
        },
      },
    });

    return videos;
  }

  async patchVideo(videoKey: string, payload: Prisma.VideoUpdateInput): Promise<Video> {
    const video = await this.apiPrismaService.video.update({
      where: {
        uuid: videoKey,
      },
      data: {
        ...payload,
      }
    });

    return video;
  }

  postVideo(file: Express.Multer.File): Observable<PostVideoProgress> {
    const progressNotifierSubject = new Subject<PostVideoProgress>();
    this.#execUploadProcess(file, progressNotifierSubject);
    return progressNotifierSubject.asObservable();
  }

  #execUploadProcess(file: Express.Multer.File, progressNotifierSubject: Subject<PostVideoProgress>) {
    // ffmpegのバイナリへのパスを指定
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const ffmpeg = fluentFfmpeg().setFfmpegPath(ffmpegPath!);
    const uuid = randomUUID();

    const tempFileUploadDir = path.join(__dirname, 'temp-file-upload');
    if (!fs.existsSync(tempFileUploadDir)) {
      fs.mkdirSync(tempFileUploadDir);
    }
    const outputDir = path.join(tempFileUploadDir, uuid);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    // 動画再生時間（秒）
    let duration = 0;
    // ffmpegでの変換処理
    ffmpeg
      .input(Readable.from(file.buffer))
      .output(`${ outputDir }/manifest.mpd`) // マニフェストファイルのパス
      .outputOptions([
        '-f dash', // DASH形式での出力を指定
        '-seg_duration 4', // セグメントの持続時間を4秒に設定
        '-use_template 1', // セグメントファイル名のテンプレート使用を有効化
        '-use_timeline 1', // タイムライン使用を有効化
        `-init_seg_name init-stream$RepresentationID$.m4s`, // 初期セグメントのファイル名
        `-media_seg_name chunk-stream$RepresentationID$-$Number%05d$.m4s`, // メディアセグメントのファイル名
        // 720p
        '-map', '0:v:0',
        '-b:v:0', '2800k',
        '-s:v:0', '1280x720',
        // 480p
        '-map', '0:v:0',
        '-b:v:1', '1400k',
        '-s:v:1', '854x480',
        // 360p
        '-map', '0:v:0',
        '-b:v:2', '800k',
        '-s:v:2', '640x360',
        // オーディオ
        '-map', '0:a:0',
        '-b:a', '128k',
      ])
      .on('codecData', codecData => {
        // 動画再生時間取得
        duration = this.#timeToSec(codecData.duration);
      })
      .on('progress', progress => {
        if (duration == 0) return;

        const percent = (this.#timeToSec(progress.timemark) / duration) * 100;
        progressNotifierSubject.next({ type: 'converting', percent });
        console.log('変換中: ', percent + '% 完了');
      })
      .on('end', async () => {
        const percent = 100;
        progressNotifierSubject.next({ type: 'converting', percent });
        console.log('変換完了: ', percent + '% 完了');

        const s3 = new S3();
        // 出力ディレクトリ内のファイル一覧を取得
        const filePaths = await fs.promises.readdir(outputDir);
        // 各ファイルをS3にアップロード
        let restFileCount = filePaths.length;
        let manifestUrl = '';
        const uploadPromises = filePaths.map(async fileName => {
          const fullFilePath = path.join(outputDir, fileName);
          const fileBuffer = await fs.promises.readFile(fullFilePath);

          return s3.upload({
            Bucket: this.configService.get('AWS_BUCKET_NAME') as string,
            Body: fileBuffer,
            Key: `${ uuid }/${ fileName }`,
          }).promise().then(sendData => {
            // マニフェストファイルのURLを保持
            if (fileName.endsWith('.mpd')) {
              manifestUrl = sendData.Location;
            }
            restFileCount--;
            const percent = ((filePaths.length - restFileCount) / filePaths.length) * 100;
            progressNotifierSubject.next({ type: 'uploading', percent });
          });
        });

        await Promise.all(uploadPromises);
        console.log('すべてのファイルをS3にアップロード完了');

        await fs.promises.rm(outputDir, { recursive: true, force: true });
        console.log('出力ディレクトリ削除');

        // ビデオデータ登録
        const video = await this.#createVideo({
          uuid,
          manifestUrl,
          duration,
          title: file.originalname,
          description: '',
          viewCount: 0,
          // TODO: 以下、要修正
          thumbnailUrl: 'https://loremflickr.com/640/360/nature?lock=2203346003820544',
          uploader: {
            connect: {
              id: 1,
            }
          },
        });
        progressNotifierSubject.next({ type: 'completed', videoUuid: video.uuid });

        progressNotifierSubject.complete();
      })
      .on('error', (err, stdout, stderr) => {
        console.error('変換エラー:', err);
        console.error('FFmpegの標準エラー出力:', stderr);

        progressNotifierSubject.error(err);
      })
      .run();
  }

  async #createVideo(data: Prisma.VideoCreateInput): Promise<Video> {
    const video = await this.apiPrismaService.video.create({
      data,
    });

    return video;
  }

  /**
   * 
   * @param time '01:23:45.67'（時:分:秒.ミリ秒）形式の時間
   * @returns 
   */
  #timeToSec(time: string) {
    const parts = time.split(':');
    const seconds = parseFloat(parts[2]);
    const minutes = parseInt(parts[1], 10);
    const hours = parseInt(parts[0], 10);
    return (hours * 3_600) + (minutes * 60) + seconds;
  }
}
