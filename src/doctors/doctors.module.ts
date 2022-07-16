import { Module } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';

@Module({
  controllers: [DoctorsController],
  providers: [DoctorsService]
})
export class DoctorsModule {}
