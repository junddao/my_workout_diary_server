import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class InSignUpDto {
  @ApiProperty({
    example: ' ',
    description: 'firebase id',
    required: true,
  })
  @IsNotEmpty()
  uid: string;

  @ApiProperty({
    example: 'kakao or apple',
    description: '로그인 소셜명',
    required: true,
  })
  @IsNotEmpty()
  social: string;

  @ApiProperty({
    example: 'junddao@kakao.com',
    description: '이메일',
    required: true,
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'aaaaaa',
    description: '패스워드',
    required: true,
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: '홍길동',
    description: '사용자명',
    required: true,
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'https://aaaa.com',
    description: '프로필 사진 경로',
    required: true,
  })
  profileImage: string;
}
