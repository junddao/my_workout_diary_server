import { ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class InCreateRecordDto {
  @ApiProperty({
    example: '0000-00-00T00:40:12+09:00',
    description: '운동시간 (40분 12초)',
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
}
