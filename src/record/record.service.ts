import { InGetTopRankersDto } from './dto/in_get_top_rankers.dto';
import { InGetRecordsDto } from './dto/in_get_records.dto';
import { InCreateRecordDto } from './dto/in_create_record.dto';
import { Injectable } from '@nestjs/common';
import { RecordRepository } from './record.repository';
import { Record } from './schemas/record.schema';
import { OutGetRecordDto } from './dto/out_get_record.dto';
import { OutGetTopRankersDto } from './dto/out_get_top_rankers.dto';
import { map } from 'rxjs';
import { ObjectId } from 'mongoose';

@Injectable()
export class RecordService {
  constructor(private readonly recordRepository: RecordRepository) {}

  async getRecord(_id: string): Promise<Record> {
    return this.recordRepository.findOne({ _id });
  }

  async getRecords(inGetRecordsDto: InGetRecordsDto): Promise<Record[]> {
    const startDate = new Date(inGetRecordsDto.startDate).toISOString();
    const endDate = new Date(inGetRecordsDto.endDate).toISOString();

    return this.recordRepository.find({
      startTime: { $gt: startDate, $lt: endDate },
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
    const startDate = new Date(inGetTopRankersDto.startDate).toISOString();
    const endDate = new Date(inGetTopRankersDto.endDate).toISOString();
    const records = await this.recordRepository.find({
      startTime: { $gt: startDate, $lt: endDate },
    });
    // 2. userid로 workoutTime을 sum 한다.
    const rankers: OutGetTopRankersDto[] = [];
    records.forEach(function (record) {
      const ranker = rankers.find((ojb) => {
        return ojb.userId === record.userId;
      });
      if (ranker === undefined) {
        const newRanker: OutGetTopRankersDto = {
          userId: record.userId,
          totalWorkoutTime: record.workoutTime,
          userName: '',
          profileImage: '',
          ranking: 0,
        };
        rankers.push(newRanker);
      } else {
        ranker.totalWorkoutTime += record.workoutTime;
      }
    });
    // 3. sort 하고
    const sortedRanker = rankers
      .sort((a, b) => a.totalWorkoutTime - b.totalWorkoutTime)
      .slice(0, 10);

    for (let i = 0; i < sortedRanker.length; i++) {
      sortedRanker[i].ranking = i;
    }

    // 4. OutGetTopRankerDto 생성후에 (10명)
    return sortedRanker;
    // 5. 배열로 return.
  }
}
