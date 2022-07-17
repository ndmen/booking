import { Types } from 'mongoose';

export class AppointmentDo {
  _id: Types.ObjectId;
  date: Date;
  user: Types.ObjectId;
  doctor: Types.ObjectId;
  active: boolean;

  constructor(props: Partial<AppointmentDo>) {
    this._id = props._id;
    this.date = props.date || null;
    this.user = props.user || null;
    this.doctor = props.doctor || null;
    this.active = props.active || null;
  }
}
