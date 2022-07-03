import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import RecordStatus from '../record_status.enum';

export type RecordDocument = Record & Document;

@Schema({ timestamps: true })
export class Record {
  _id: ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: ObjectId;

  @Prop()
  workoutTime: number;

  @Prop({ required: true })
  condition: RecordStatus;

  @Prop({ required: true })
  startTime: Date;

  @Prop({ required: true })
  endTime: Date;

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  createdAt: Date;

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  updatedAt: Date;

  userName: string;

  profileImage: string;
}

export const RecordSchema = SchemaFactory.createForClass(Record);

// RecordSchema.virtual('user', {
//   ref: 'User', // 참조할 collections
//   localField: 'userId', // 현재 스키마에 선언되어 있는 참조할 필드
//   foreignField: '_id', // collections에서 참조할 필드
//   justOne: true, // 하나만 반환하는지 여부
// });
