import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Document } from 'mongoose';
import RecordStatus from '../record_status.enum';

export type RecordDocument = Record & Document;

@Schema({ timestamps: true })
export class Record {
  _id: string;

  @Prop()
  workoutTime: Date;

  @Prop()
  condition: RecordStatus;

  @Prop()
  startTime: Date;

  @Prop()
  endTime: Date;

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  createdAt: Date;

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  updatedAt: Date;
}

export const RecordSchema = SchemaFactory.createForClass(Record);
