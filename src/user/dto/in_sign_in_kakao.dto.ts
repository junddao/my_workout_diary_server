import { ApiProperty } from '@nestjs/swagger';
import { isNotEmpty, IsNotEmpty } from 'class-validator';

export class InSignInKakaoDto {
  @ApiProperty({
    example: 'junddao@kakao.com',
    description: 'email',
    required: true,
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: ' ',
    description: 'firebase id',
    required: true,
  })
  @IsNotEmpty()
  uid: string;

  @ApiProperty({
    example: '홍길동',
    description: '사용자명',
    required: false,
  })
  name: string;

  @ApiProperty({
    example: 'https://aaaaa.com',
    description: '프로필 사진 경로',
    required: false,
  })
  profileImage: string;
}
