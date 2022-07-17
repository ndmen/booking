import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AppointmentSchema,
  Appointment,
} from 'src/_schemas/appointment.schema';
import { AppointmentsRepository } from './appointments.repository';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Appointment.name, schema: AppointmentSchema },
    ]),
    UsersModule,
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService, AppointmentsRepository],
})
export class AppointmentsModule {}
