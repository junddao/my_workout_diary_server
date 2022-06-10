import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  _id: string;

  @Prop()
  email: string;

  @Prop()
  nickname: string;

  @Prop()
  introduce: string;

  @Prop()
  profileImage: string;

  // @Prop()
  // status (signed, active, left)

  @Prop()
  pushEnabled: boolean;

  @Prop()
  agreeTerms: boolean;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  password: string;

  @Prop()
  name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
