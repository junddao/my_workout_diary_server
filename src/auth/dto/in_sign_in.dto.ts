import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class InSignInDto {
  @ApiProperty({
    example: ' ',
    description: 'firebase id',
    required: true,
  })
  @IsNotEmpty()
  fbUid: string;

  // @IsNotEmpty()
  // password: string;
}
