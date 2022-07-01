// import {
//   Controller,
//   Post,
//   UploadedFile,
//   UseInterceptors,
// } from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';
// import * as AWS from 'aws-sdk';
// import { ResponseDto } from 'src/common/dto/response.dto';

// const BUCKET_NAME = 'my-workout-diary-bucket';

// @Controller('upload')
// export class UploadsController {
//   @Post('/file')
//   @UseInterceptors(FileInterceptor('file'))
//   async uploadFile(@UploadedFile() file): Promise<ResponseDto<null>> {
//     AWS.config.update({
//       region: 'ap-northeast-2',
//       credentials: {
//         accessKeyId: process.env.AWS_ACCESS_KEY,
//         secretAccessKey: process.env.AWS_SECRET_KEY,
//       },
//     });
//     try {
//       const upload = await new AWS.S3()
//         .putObject({
//           Key: `${Date.now().toString()}-${file.originalname}`,
//           Body: file.buffer,
//           Bucket: BUCKET_NAME,
//         })
//         .promise();
//       console.log(upload);
//       return {
//         success: true,
//         error: null,
//         data: null,
//       };
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }

import { Controller, Post, Req, Res } from '@nestjs/common';
import { UploadsService } from './uploads.service';

@Controller('upload')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}
  @Post('/files')
  async create(@Req() request, @Res() response) {
    try {
      await this.uploadsService.fileUpload(request, response);
    } catch (error) {
      return response
        .status(500)
        .json(`Failed to upload image file: ${error.message}`);
    }
  }
}
