import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { AppointmentsRepository } from './appointments.repository';
import { UsersService } from 'src/users/users.service';
import { DoctorsService } from 'src/doctors/doctors.service';
import { NotificationsService } from 'src/notifications/notifications.service';
import { AcceptAppointmentDto } from './dto/accept-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(
    private readonly appointmentsRepository: AppointmentsRepository,
    private readonly usersService: UsersService,
    private readonly doctorsService: DoctorsService,
    private readonly notificationsService: NotificationsService,
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
    const acceptedAppointment = await this.appointmentsRepository.updateOne(
      findAppointment._id,
    );
    if (!acceptedAppointment) {
      throw new NotFoundException('Appointment not found');
    }
    const appointmentDate = new Date(findAppointment.date);
    const nowDate = new Date(Date.now());
    if (appointmentDate < nowDate) {
      throw new ForbiddenException('Appointment not valid');
    }
    const user = await this.usersService.updateAppointment(
      findAppointment.user,
      findAppointment._id,
    );
    const acceptDoctorAppointment = await this.doctorsService.updateAppointment(
      findAppointment.doctor,
      findAppointment._id,
    );
    const addCronNotification =
      await this.notificationsService.createCronNotification(
        findAppointment._id,
        findAppointment.user,
        findAppointment.doctor,
        findAppointment.date,
      );

    return acceptedAppointment;
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
