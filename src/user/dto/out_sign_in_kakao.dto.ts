import { ApiProperty } from '@nestjs/swagger';
import { isNotEmpty, IsNotEmpty } from 'class-validator';

export class OutSignInKakaoDto {
  @ApiProperty({
    example: 'firebase custom token',
    description: 'adfasdfasdf',
    required: true,
  })
  @IsNotEmpty()
  fbCustomToken: string;
}
