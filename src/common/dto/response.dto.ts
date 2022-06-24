import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiProperty,
  getSchemaPath,
} from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ResponseDto<T> {
  @ApiProperty({
    example: true,
    description: '요청 성공 여부',
    required: true,
  })
  @IsNotEmpty()
  success: boolean;

  error?: string | null;

  data?: T[] | null;
}

export const ApiResponseDto = <T extends Type<any>>(data: T) => {
  return applyDecorators(
    ApiExtraModels(ResponseDto, data),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseDto) },
          {
            properties: {
              data: {
                type: 'array',
                items: {
                  $ref: getSchemaPath(data),
                },
              },
            },
          },
        ],
      },
    }),
  );
};
