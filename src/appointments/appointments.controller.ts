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
  async creatAappointment(@Body() createAppointmentDto: CreateAppointmentDto) {
    return await this.appointmentsService.createAappointment(
      createAppointmentDto,
    );
  }

  @Post('accept/:appointment_id')
  async acceptAappointment(@Param('appointment_id') appointment_id: string) {
    return await this.appointmentsService.acceptAappointment(appointment_id);
  }

  @Post('decline/:appointment_id')
  async declineAappointment(@Param('appointment_id') appointment_id: string) {
    return await this.appointmentsService.declineAappointment(appointment_id);
  }
}
