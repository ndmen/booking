import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('appointments')
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  async create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return await this.appointmentsService.create(createAppointmentDto);
  }

  // @Post('accept/id')
  // async accept(@Body() createAppointmentDto: CreateAppointmentDto) {
  //   return await this.appointmentsService.accept(createAppointmentDto);
  // }
}
