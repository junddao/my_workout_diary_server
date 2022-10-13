import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { InCreateRecordDto } from './dto/in_create_record.dto';
import { InGetRecordsDto } from './dto/in_get_records.dto';
import { InGetTopRankersDto } from './dto/in_get_top_rankers.dto';
import { OutGetTopRankersDto } from './dto/out_get_top_rankers.dto';
import { RecordRepository } from './record.repository';
import { Record } from './schemas/record.schema';

@Injectable()
export class RecordService {
  constructor(private readonly recordRepository: RecordRepository) {}

  async getRecord(_id: string): Promise<Record> {
    return this.recordRepository.findOne({ _id });
  }

  async getRecords(
    inGetRecordsDto: InGetRecordsDto,
    id: ObjectId,
  ): Promise<Record[]> {
    const startDate = new Date(inGetRecordsDto.startDate).toISOString();
    const endDate = new Date(inGetRecordsDto.endDate).toISOString();

    return this.recordRepository.find({
      startTime: { $gt: startDate, $lt: endDate },
      userId: id,
    });
  }

  async createRecord(
    inCreateRecordDto: InCreateRecordDto,
    userId: ObjectId,
  ): Promise<Record> {
    return this.recordRepository.createRecord(inCreateRecordDto, userId);
  }

  async deleteRecord(_id: string): Promise<void> {
    await this.recordRepository.delete({ _id });
  }

  async getTopRankers(
    inGetTopRankersDto: InGetTopRankersDto,
  ): Promise<OutGetTopRankersDto[]> {
    // 1. 기간내 모든 기록을 가져오고
    const records = await this.recordRepository.findWithProduct(
      new Date(inGetTopRankersDto.startDate),
      new Date(inGetTopRankersDto.endDate),
    );

    // 2. userid로 workoutTime을 sum 한다.
    const rankers: OutGetTopRankersDto[] = [];
    records.forEach(function (record) {
      const ranker = rankers.find((obj) => {
        return obj.userId.toString() === record.userId.toString();
      });

      if (ranker === undefined) {
        const newRanker: OutGetTopRankersDto = {
          userId: record.userId,
          totalWorkoutTime: record.workoutTime,
          userName: record.userName,
          profileImage: record.profileImage,
          workoutDates: [record.startTime],
          ranking: 0,
        };
        rankers.push(newRanker);
      } else {
        ranker.totalWorkoutTime += record.workoutTime;
        const temp = ranker.workoutDates.find((date) => {
          console.log(date.getDay());
          console.log(record.startTime.getDay());
          return date.getDay() === record.startTime.getDay();
        });
        if (temp === undefined) {
          ranker.workoutDates.push(record.startTime);
        }
      }
    });
    // 3. sort 하고
    const sortedRanker = rankers
      .sort((a, b) => b.totalWorkoutTime - a.totalWorkoutTime)
      .slice(0, 10);

    for (let i = 0; i < sortedRanker.length; i++) {
      sortedRanker[i].ranking = i;
    }

    // 4. OutGetTopRankerDto 생성후에 (10명)
    return sortedRanker;
    // 5. 배열로 return.
  }
}
