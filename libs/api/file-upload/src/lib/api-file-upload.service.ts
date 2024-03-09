import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { Readable, Stream } from 'stream';
import ffmpegPath from 'ffmpeg-static';
import fluentFfmpeg from 'fluent-ffmpeg';

// ffmpegのバイナリへのパスを指定
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const ffmpeg = fluentFfmpeg().setFfmpegPath(ffmpegPath!);

@Injectable()
export class ApiFileUploadService {

  constructor(
    private configService: ConfigService,
  ) { }

  async uploadFile(file: Express.Multer.File) {
    ffmpeg
      .input(Readable.from(file.buffer))
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
      .on('end', () => {
        console.log('変換完了');
      })
      .on('error', (err, stdout, stderr) => {
        console.error('変換エラー:', err);
        console.error('FFmpegの標準エラー出力:', stderr);
      });

    const passThrough = new Stream.PassThrough();

    ffmpeg.pipe(passThrough, { end: true });

    const s3 = new S3();

    const uploadResult = await s3.upload({
      Bucket: this.configService.get('AWS_BUCKET_NAME') as string,
      Body: passThrough,
      Key: file.filename,
    }).promise();

    console.log('Key:', uploadResult.Key);
    console.log('url:', uploadResult.Location);

    // 一時ファイルを削除
  }
}
