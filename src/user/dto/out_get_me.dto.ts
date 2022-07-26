import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongoose';

export class OutGetMeDto {
  @ApiProperty({
    example: '62ab12a23e9e123a2c054f',
    description: 'id',
    required: true,
  })
  @IsNotEmpty()
  _id: ObjectId;

  @ApiProperty({
    example: 'junddao@kakao.com',
    description: '이메일',
    required: true,
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '홍길동',
    description: '사용자명',
    required: true,
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '안녕하세요. 미로입니다.',
    description: '소개글',
    required: false,
  })
  introduce: string;

  @ApiProperty({
    example: 'https://aaaa.com',
    description: '프로필 사진 경로',
    required: true,
  })
  profileImage: string;

  @ApiProperty({
    example: 'kakao / apple',
    description: '로그인 소셜 정보',
    required: true,
  })
  social: string;

  // @IsNotEmpty()
  // status (signed, active, left)
  @IsNotEmpty()
  status: string;

  @ApiProperty({
    example: 'true / false',
    description: 'push 여부',
    required: false,
  })
  pushEnabled: boolean;

  @ApiProperty({
    example: '2017-03-16T17:40:00+09:00',
    description: '생성(ISO 8601 시간)',
    required: false,
  })
  @IsNotEmpty()
  createdAt: Date;

  @ApiProperty({
    example: '2017-03-16T17:40:00+09:00',
    description: '수정(ISO 8601 시간)',
    required: false,
  })
  @IsNotEmpty()
  updatedAt: Date;
}
