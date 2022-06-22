import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class OutCommonDto<T> {
  @ApiProperty({
    example: true,
    description: '요청 성공 여부',
    required: true,
  })
  @IsNotEmpty()
  success: boolean;

  @ApiProperty({
    example: true,
    description: '요청 성공 여부',
    required: false,
  })
  error?: string | null;

  @ApiProperty({
    example: 'data',
    description: 'data',
    required: false,
  })
  data?: T | null;
}
