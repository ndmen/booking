import { Injectable, NotFoundException } from '@nestjs/common';
import { AppointmentsRepository } from './appointments.repository';

@Injectable()
export class AppointmentsService {
  constructor(
    private readonly appointmentsRepository: AppointmentsRepository,
  ) {}

  async create(CreateAppointmentDto): Promise<any> {
    const appointment = await this.appointmentsRepository.createOne(
      CreateAppointmentDto,
    );
    return appointment;
  }

  async findOne(id): Promise<any> {
    const appointment = this.appointmentsRepository.findOne(id);
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }
    return appointment;
  }
}
