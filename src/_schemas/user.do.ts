import { Types } from 'mongoose';

export class UserDo {
  _id: Types.ObjectId;
  email: string;
  reg_token: string;
  photo_avatar: string;
  phone: string;
  name: string;
  type: string;
  appointments: Types.ObjectId[];

  constructor(props: Partial<UserDo>) {
    this._id = props._id;
    this.email = props.email || null;
    this.reg_token = props.reg_token || null;
    this.photo_avatar = props.photo_avatar || null;
    this.phone = props.phone || null;
    this.name = props.name || null;
    this.type = props.type || null;
    this.appointments = props.appointments || null;
  }
}
