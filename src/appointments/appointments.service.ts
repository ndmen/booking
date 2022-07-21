import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { AppointmentsRepository } from './appointments.repository';
import { UsersService } from 'src/users/users.service';
import { AcceptAppointmentDto } from './dto/accept-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(
    private readonly appointmentsRepository: AppointmentsRepository,
    private readonly usersService: UsersService,
  ) {}

  async createAppointment(CreateAppointmentDto): Promise<any> {
    const findActiveAppointments = await this.checkAppointment(
      CreateAppointmentDto.doctor_id,
      true,
    );
    if (findActiveAppointments.length >= 3) {
      throw new ForbiddenException('Doctor not free');
    }
    const appointment = await this.appointmentsRepository.createOne(
      CreateAppointmentDto,
    );
    const user = await this.usersService.updateAppointment(
      appointment.user,
      appointment._id,
    );
    return appointment;
  }

  async findAppointmentById(appointment_id: string): Promise<any> {
    const appointment = await this.appointmentsRepository.findOne(
      appointment_id,
    );
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }
    return appointment;
  }

  async checkAppointment(doctor_id: string, active: boolean): Promise<any> {
    const findActiveAppointments = await this.appointmentsRepository.findAll(
      doctor_id,
      active,
    );
    return findActiveAppointments;
  }

  async acceptAppointment(appointment_id: string): Promise<any> {
    const findAppointment = await this.findAppointmentById(appointment_id);
    const acceptAppointment = await this.appointmentsRepository.updateOne(
      findAppointment._id,
    );
    if (!acceptAppointment) {
      throw new NotFoundException('Appointment not found');
    }
    return acceptAppointment;
  }

  async declineAppointment(appointment_id: string): Promise<any> {
    const findAppointment = await this.findAppointmentById(appointment_id);
    if (!findAppointment) {
      throw new NotFoundException('Appointment not found');
    }
    const removeAppointment = await this.appointmentsRepository.removeOne(
      findAppointment._id,
    );
    return removeAppointment;
  }
}
