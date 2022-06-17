import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class InSignInDto {
  @ApiProperty({
    example: 'junddao@kakao.com',
    description: 'email',
    required: true,
  })
  @IsNotEmpty()
  email: string;
}
