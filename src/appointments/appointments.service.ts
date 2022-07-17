import { Injectable, NotFoundException } from '@nestjs/common';
import { AppointmentsRepository } from './appointments.repository';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AppointmentsService {
  constructor(
    private readonly appointmentsRepository: AppointmentsRepository,
    private readonly usersService: UsersService,
  ) {}

  async create(CreateAppointmentDto): Promise<any> {
    const appointment = await this.appointmentsRepository.createOne(
      CreateAppointmentDto,
    );
    const user = this.usersService.updateAppointment(
      appointment.user,
      appointment._id,
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
