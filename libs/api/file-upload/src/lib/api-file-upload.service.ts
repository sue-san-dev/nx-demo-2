import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { randomUUID } from 'crypto';

@Injectable()
export class ApiFileUploadService {

  constructor(
    private configService: ConfigService,
  ) { }

  async uploadFile(dataBuffer: Buffer, filename: string) {
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: this.configService.get('AWS_BUCKET_NAME') as string,
        Body: dataBuffer,
        Key: `${ randomUUID() }-${ filename }`,
      })
      .promise();

    console.log('Key:', uploadResult.Key);
    console.log('url:', uploadResult.Location);
  }

}
