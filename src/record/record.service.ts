import { InCreateRecordDto } from './dto/in_create_record.dto';
import { Injectable } from '@nestjs/common';
import { RecordRepository } from './record.repository';
import { Record } from './schemas/record.schema';
import { OutGetRecordDto } from './dto/out_get_record.dto';

@Injectable()
export class RecordService {
  constructor(private readonly recordRepository: RecordRepository) {}

  async getRecord(_id: string): Promise<Record> {
    return this.recordRepository.findOne({ _id });
  }

  async createRecord(inCreateRecordDto: InCreateRecordDto): Promise<Record> {
    return this.recordRepository.createRecord(inCreateRecordDto);
  }
}
