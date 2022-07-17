import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

export type AppointmentDocument = Appointment & Document;

@Schema({ versionKey: false, timestamps: true })
export class Appointment {
  @Prop()
  date: Date;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Doctor' })
  doctor: Types.ObjectId;

  @Prop()
  active: boolean;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
