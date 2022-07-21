import { Controller, Post, Body, Param } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { AcceptAppointmentDto } from './dto/accept-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('appointments')
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  async createAppointment(@Body() createAppointmentDto: CreateAppointmentDto) {
    return await this.appointmentsService.createAppointment(
      createAppointmentDto,
    );
  }

  @Post('accept/:appointment_id')
  async acceptAppointment(@Param('appointment_id') appointment_id: string) {
    return await this.appointmentsService.acceptAppointment(appointment_id);
  }

  @Post('decline/:appointment_id')
  async declineAppointment(@Param('appointment_id') appointment_id: string) {
    return await this.appointmentsService.declineAppointment(appointment_id);
  }
}
