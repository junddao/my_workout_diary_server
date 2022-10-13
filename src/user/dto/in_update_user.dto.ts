import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongoose';

export class InUpdateUserDto {
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

  @IsNotEmpty()
  status: string;

  @ApiProperty({
    example: '안녕하세요. 미로입니다.',
    description: '소개글',
    required: false,
  })
  @IsNotEmpty()
  introduce: string;

  @ApiProperty({
    example: 'https://aaaa.com',
    description: '프로필 사진 경로',
    required: true,
  })
  @IsNotEmpty()
  profileImage: string;

  // @IsNotEmpty()
  // status (signed, active, left)

  @ApiProperty({
    example: 'true / false',
    description: 'push 여부',
    required: false,
  })
  @IsNotEmpty()
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
