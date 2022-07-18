import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DoctorDo } from 'src/_schemas/doctor.do';

export class DoctorsRepository {
  constructor(
    @InjectModel('Doctor')
    private doctorModel: Model<DoctorDo>,
  ) {}

  async createOne(doctor): Promise<any> {
    const result = await this.doctorModel.create(doctor);
    return result;
  }

  async findOne(email): Promise<any> {
    const result = await this.doctorModel.findOne({ email: email });
    return result;
  }
}
