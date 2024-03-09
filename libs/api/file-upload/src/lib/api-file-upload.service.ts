import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { randomUUID } from 'crypto';
import { Readable } from 'stream';
import ffmpegPath from 'ffmpeg-static';
import fluentFfmpeg from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs';

// ffmpegのバイナリへのパスを指定
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const ffmpeg = fluentFfmpeg().setFfmpegPath(ffmpegPath!);

@Injectable()
export class ApiFileUploadService {

  constructor(
    private configService: ConfigService,
  ) { }

  async uploadFile(file: Express.Multer.File) {
    const uuid = randomUUID();

    const tempVideosPath = path.join(process.cwd(), 'temp-videos');
    if (!fs.existsSync(tempVideosPath)) {
      // ディレクトリが存在しない場合、作成
      fs.mkdirSync(tempVideosPath);
    }
    const outputPath = path.join(tempVideosPath, `${ uuid }_manifest.mpd`);

    ffmpeg
      .input(Readable.from(file.buffer))
      // .inputFormat('mp4')
      .outputOptions([
        '-f', 'dash',
        '-seg_duration', '4',
        '-use_template', '1',
        '-use_timeline', '1',
        '-init_seg_name', 'init-stream$RepresentationID$.m4s',
        '-media_seg_name', 'chunk-stream$RepresentationID$-$Number%05d$.m4s',
        '-map', '0:v:0',
        '-b:v:0', '2800k',
        '-s:v:0', '1280x720',
        '-map', '0:v:0',
        '-b:v:1', '1400k',
        '-s:v:1', '854x480',
        '-map', '0:v:0',
        '-b:v:2', '800k',
        '-s:v:2', '640x360',
        '-map', '0:a:0',
        '-b:a', '128k'
      ])
      .output(outputPath)
      .on('end', () => {
        console.log('変換完了');
      })
      .on('error', (err, stdout, stderr) => {
        console.error('変換エラー:', err);
        console.error('FFmpegの標準エラー出力:', stderr);
      })
      .on('close', async (code: number) => {
        console.log(`child process exited with code ${ code }`);

        // S3アップロードはffmpegが完了した後に行う
        if (code === 0) {
          const s3 = new S3();
          const fileStream = fs.createReadStream(outputPath);

          const uploadResult = await s3.upload({
            Bucket: this.configService.get('AWS_BUCKET_NAME') as string,
            Body: fileStream,
            Key: `${ uuid }-${ file.filename }`,
          }).promise();

          console.log('Key:', uploadResult.Key);
          console.log('url:', uploadResult.Location);

          // 一時ファイルを削除
        }
      })
      .addOptions([
        '-analyzeduration 10000000',
        '-probesize 10000000'
      ])
      .run();
  }

}
