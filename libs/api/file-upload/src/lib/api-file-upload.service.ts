import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { Readable } from 'stream';
import { randomUUID } from 'crypto';
import ffmpegPath from 'ffmpeg-static';
import fluentFfmpeg from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs';

@Injectable()
export class ApiFileUploadService {

  constructor(
    private configService: ConfigService,
  ) { }

  async uploadFile(file: Express.Multer.File) {

    // ffmpegのバイナリへのパスを指定
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const ffmpeg = fluentFfmpeg().setFfmpegPath(ffmpegPath!);

    const tempFileUploadDir = path.join(__dirname, 'temp-file-upload');
    if (!fs.existsSync(tempFileUploadDir)) {
      fs.mkdirSync(tempFileUploadDir);
    }
    const uuid = randomUUID();
    const outputDir = path.join(tempFileUploadDir, uuid);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    return new Promise(processCompleted => {
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
        .on('end', async () => {
          console.log('変換完了');

          const s3 = new S3();
          // 出力ディレクトリ内のファイル一覧を取得
          const filePaths = await fs.promises.readdir(outputDir);
          // 各ファイルをS3にアップロード
          const uploadPromises = filePaths.map(async fileName => {
            const fullFilePath = path.join(outputDir, fileName);
            const fileBuffer = await fs.promises.readFile(fullFilePath);

            return s3.upload({
              Bucket: this.configService.get('AWS_BUCKET_NAME') as string,
              Body: fileBuffer,
              Key: `${ uuid }/${ fileName }`,
            }).promise();
          });

          await Promise.all(uploadPromises);
          console.log('すべてのファイルをS3にアップロード完了');

          await fs.promises.rm(outputDir, { recursive: true, force: true });
          console.log('出力ディレクトリ削除');

          processCompleted(true);
        })
        .on('error', (err, stdout, stderr) => {
          console.error('変換エラー:', err);
          console.error('FFmpegの標準エラー出力:', stderr);
        })
        .run();
    });
  }

}
