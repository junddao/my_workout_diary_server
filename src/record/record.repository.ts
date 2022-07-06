import { User, UserDocument } from './../user/schemas/user.schema';
import { InCreateRecordDto } from './dto/in_create_record.dto';
import { Record, RecordDocument } from './schemas/record.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery, ObjectId } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';

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
  async findWithProduct(startDate: Date, endDate: Date): Promise<Record[]> {
    const result = await this.recordModel.aggregate([
      {
        $match: {
          startTime: { $gt: startDate, $lt: endDate },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $addFields: {
          userName: { $arrayElemAt: ['$user.name', 0] },
          profileImage: { $arrayElemAt: ['$user.profileImage', 0] },
        },
      },
    ]);

    return result;
  }

  async delete(recordFilterQuery: FilterQuery<Record>): Promise<void> {
    try {
      const result = await this.recordModel.deleteOne(recordFilterQuery);
      if (result.deletedCount === 0) {
        throw new NotFoundException(`can't find id`);
      }
    } catch (e) {
      throw new NotFoundException(`can't delete this id`);
    }
  }

  async createRecord(
    inCreateRecordDto: InCreateRecordDto,
    userId: ObjectId,
  ): Promise<Record> {
    const createdRecord = new this.recordModel(inCreateRecordDto);
    createdRecord.userId = userId;
    return createdRecord.save();
  }
}
