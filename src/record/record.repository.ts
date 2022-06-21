import { InCreateRecordDto } from './dto/in_create_record.dto';
import { Record, RecordDocument } from './schemas/record.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RecordRepository {
  constructor(
    @InjectModel(Record.name) private recordModel: Model<RecordDocument>,
  ) {}

  async findOne(recordFilterQuery: FilterQuery<Record>): Promise<Record> {
    return this.recordModel.findOne(recordFilterQuery);
  }
  async find(recordFilterQuery: FilterQuery<Record>): Promise<Record[]> {
    return this.recordModel.find(recordFilterQuery);
  }

  async createRecord(inCreateRecordDto: InCreateRecordDto): Promise<Record> {
    const createdRecord = new this.recordModel(inCreateRecordDto);
    return createdRecord.save();
  }
}
