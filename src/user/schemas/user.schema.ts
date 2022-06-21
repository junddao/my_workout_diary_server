import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  _id: string;

  @Prop()
  fbUid: string;

  @Prop()
  email: string;

  @Prop()
  social: string;

  @Prop()
  name: string;

  @Prop()
  introduce: string;

  @Prop()
  profileImage: string;

  @Prop()
  pushEnabled: boolean;

  @Prop()
  status: string;

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  createdAt: Date;

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
