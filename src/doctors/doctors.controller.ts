import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('doctors')
@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Post()
  async createDoctor(@Body() createDoctorDto: CreateDoctorDto) {
    return await this.doctorsService.createDoctor(createDoctorDto);
  }
}
