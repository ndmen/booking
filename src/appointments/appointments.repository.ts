import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppointmentDo } from 'src/_schemas/appointment.do';

export class AppointmentsRepository {
  constructor(
    @InjectModel('Appointment')
    private appointmentModel: Model<AppointmentDo>,
  ) {}

  async createOne(appointment): Promise<any> {
    const result = await this.appointmentModel.create(appointment);
    return result;
  }

  async findOne(appointment_id): Promise<any> {
    const result = await this.appointmentModel.findById(appointment_id);
    return result;
  }

  async findAll(doctor_id, active): Promise<any> {
    const result = await this.appointmentModel.find({
      $and: [{ doctor_id: doctor_id }, { active: active }],
    });
    return result;
  }

  async updateOne(appointment_id): Promise<any> {
    const result = await this.appointmentModel.updateOne(
      {
        _id: appointment_id,
      },
      {
        active: true,
      },
    );
    return result;
  }

  async removeOne(appointment_id): Promise<any> {
    const result = await this.appointmentModel.findByIdAndDelete(
      appointment_id,
    );
    return result;
  }
}
