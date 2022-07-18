import { Injectable, NotFoundException } from '@nestjs/common';
import { AppointmentsRepository } from './appointments.repository';
import { UsersService } from 'src/users/users.service';
import { AcceptAppointmentDto } from './dto/accept-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(
    private readonly appointmentsRepository: AppointmentsRepository,
    private readonly usersService: UsersService,
  ) {}

  async createAappointment(CreateAppointmentDto): Promise<any> {
    const appointment = await this.appointmentsRepository.createOne(
      CreateAppointmentDto,
    );
    const user = await this.usersService.updateAppointment(
      appointment.user,
      appointment._id,
    );
    return appointment;
  }

  async findAappointmentById(appointment_id: string): Promise<any> {
    const appointment = await this.appointmentsRepository.findOne(
      appointment_id,
    );
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }
    return appointment;
  }

  async acceptAappointment(appointment_id: string): Promise<any> {
    const findAppointment = await this.findAappointmentById(appointment_id);
    const acceptAppointment = await this.appointmentsRepository.updateOne(
      findAppointment._id,
    );
    if (!acceptAppointment) {
      throw new NotFoundException('Appointment not found');
    }
    return acceptAppointment;
  }

  async declineAappointment(appointment_id: string): Promise<any> {
    const findAppointment = await this.findAappointmentById(appointment_id);
    const acceptAppointment = await this.appointmentsRepository.updateOne(
      findAppointment._id,
    );
    if (!acceptAppointment) {
      throw new NotFoundException('Appointment not found');
    }
    return acceptAppointment;
  }
}
