import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class OutCommonDto {
  @ApiProperty({
    example: true,
    description: '요청 성공 여부',
    required: true,
  })
  @IsNotEmpty()
  result: boolean;
}
