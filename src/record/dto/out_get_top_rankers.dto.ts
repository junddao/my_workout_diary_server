import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongoose';

export class OutGetTopRankersDto {
  @ApiProperty({
    example: '1123sadad123wedqe',
    description: '생성 유저의 id',
    required: true,
  })
  @IsNotEmpty()
  userId: ObjectId;

  @ApiProperty({
    example: '홍길동',
    description: '생성 유저의 이름',
    required: true,
  })
  @IsNotEmpty()
  userName: string;

  @ApiProperty({
    example: '프로필 이미지',
    description: '프로필 이미지',
    required: true,
  })
  profileImage: string;

  @ApiProperty({
    example: '123',
    description: '이번달 총 운동시간',
    required: true,
  })
  @IsNotEmpty()
  totalWorkoutTime: number;

  @ApiProperty({
    example: '123',
    description: '이번달 총 운동시간',
    required: true,
  })
  @IsNotEmpty()
  workoutDates: [Date];

  @ApiProperty({
    example: '1',
    description: '랭킹',
    required: true,
  })
  @IsNotEmpty()
  ranking: number;
}
