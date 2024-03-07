import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { randomUUID } from 'crypto';
import { spawn } from 'child_process';
import { get720Commands } from './ffmpeg-encode-fns';
import { createReadStream } from 'fs';

@Injectable()
export class ApiFileUploadService {

  constructor(
    private configService: ConfigService,
  ) { }

  async uploadFile(filePath: string, filename: string) {
    const uuid = randomUUID();
    const outputPath = `/temp-videos/${ uuid }_manifest.mpd`;

    console.log('filePath: ', filePath);

    const ffmpegArgs = [
      // 入力ファイル
      '-i', filePath,
      // 720pでエンコード
      ...get720Commands(),
      // DASH形式で出力
      '-f', 'dash', outputPath,
    ];

    const child = spawn('docker', [
      'run', '--rm', '-i',
      'nx-demo-ffmpeg', // Docker イメージ名
      'ffmpeg', // Docker 内で実行するコマンド
      ...ffmpegArgs, // ffmpeg 引数
    ]);

    child.stdout.on('data', (data) => {
      console.log(`stdout: ${ data }`);
    });

    child.stderr.on('data', (data) => {
      console.error(`stderr: ${ data }`);
    });

    child.on('close', async (code) => {
      console.log(`child process exited with code ${ code }`);

      // S3アップロードはffmpegが完了した後に行う
      if (code === 0) {
        const s3 = new S3();
        const fileStream = createReadStream(outputPath);

        const uploadResult = await s3.upload({
          Bucket: this.configService.get('AWS_BUCKET_NAME') as string,
          Body: fileStream,
          Key: `${ uuid }-${ filename }`,
        }).promise();

        console.log('Key:', uploadResult.Key);
        console.log('url:', uploadResult.Location);

        // 一時ファイルを削除
      }
    });
  }

}
