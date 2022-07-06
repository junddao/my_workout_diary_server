import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as AWS from 'aws-sdk';
import { ResponseDto } from 'src/common/dto/response.dto';

@Controller('upload')
export class UploadsController {
  constructor(private readonly config: ConfigService) {}
  @Post('/file')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file): Promise<ResponseDto<string>> {
    AWS.config.update({
      region: 'ap-northeast-2',
      credentials: {
        accessKeyId: this.config.get('AWS_ACCESS_KEY'),
        secretAccessKey: this.config.get('AWS_SECRET_KEY'),
      },
    });
    try {
      const BUCKET_NAME = this.config.get('AWS_BUCKET_NAME');
      const objectName = `profile_image/${Date.now().toString()}-${
        file.originalname
      }`;
      const upload = await new AWS.S3()
        .putObject({
          Key: objectName,
          Body: file.buffer,
          Bucket: BUCKET_NAME,
        })
        .promise();
      console.log(upload);
      const url = `https://${BUCKET_NAME}.s3.ap-northeast-2.amazonaws.com/${objectName}`;
      return {
        success: true,
        error: null,
        data: [url],
      };
    } catch (error) {
      console.log(error);
    }
  }
}
