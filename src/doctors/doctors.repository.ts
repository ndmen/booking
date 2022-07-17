import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DoctorDo } from 'src/_schemas/doctor.do';

export class DoctorsRepository {
  constructor(
    @InjectModel('Doctor')
    private doctorModel: Model<DoctorDo>,
  ) {}

  async createOne(doctor): Promise<any> {
    const createOne = await this.doctorModel.create(doctor);
    return createOne;
  }

  async findOne(email): Promise<any> {
    const findOne = await this.doctorModel.findOne({ email: email });
    return findOne;
  }
}
