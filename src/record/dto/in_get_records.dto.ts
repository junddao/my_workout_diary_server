import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class InGetRecordsDto {
  @ApiProperty({
    example: '2017-03-16T17:40:00+09:00',
    description: '검색 시작 날짜',
    required: true,
  })
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty({
    example: '2017-03-16T17:40:00+09:00',
    description: '검색 종료 날짜',
    required: true,
  })
  @IsNotEmpty()
  endDate: Date;
}
