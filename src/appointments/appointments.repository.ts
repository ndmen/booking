import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppointmentDo } from 'src/_schemas/appointment.do';

export class AppointmentsRepository {
  constructor(
    @InjectModel('Appointment')
    private appointmentModel: Model<AppointmentDo>,
  ) {}

  async createOne(appointment): Promise<any> {
    const createOne = await this.appointmentModel.create(appointment);
    return createOne;
  }

  async findOne(id): Promise<any> {
    const findOne = await this.appointmentModel.findOne({ _id: id });
    return findOne;
  }
}
