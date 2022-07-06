import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongoose';

export class OutGetRecordsDto {
  @ApiProperty({
    example: '62ab12a23e9e123a2c054f',
    description: 'id',
    required: true,
  })
  @IsNotEmpty()
  _id: ObjectId;

  @ApiProperty({
    example: '1123sadad123wedqe',
    description: '생성 유저의 id',
    required: true,
  })
  @IsNotEmpty()
  userId: ObjectId;

  @ApiProperty({
    example: '2017-03-16T17:40:00+09:00',
    description: '운동시간',
    required: true,
  })
  @IsNotEmpty()
  workoutTime: number;

  @ApiProperty({
    example: 'GT / VG / GD / NB / BD',
    description: '운동후 컨디션',
    required: true,
  })
  @IsNotEmpty()
  condition: string;

  @ApiProperty({
    example: '2017-03-16T17:40:00+09:00',
    description: '시작시간(ISO 8601 시간)',
    required: false,
  })
  @IsNotEmpty()
  startTime: Date;

  @ApiProperty({
    example: '2017-03-16T17:40:00+09:00',
    description: '종료 시간(ISO 8601 시간)',
    required: false,
  })
  @IsNotEmpty()
  endTime: Date;

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
