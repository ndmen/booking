import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ versionKey: false, timestamps: true })
export class User {
  @Prop({ required: true, index: true })
  email: string;

  @Prop()
  reg_token: string;

  @Prop()
  photo_avatar: string;

  @Prop()
  phone: string;

  @Prop()
  name: string;

  @Prop()
  type: string;

  @Prop({ type: Types.ObjectId, ref: 'Appointment' })
  appointments: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
