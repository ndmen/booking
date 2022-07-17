import { Injectable, NotFoundException } from '@nestjs/common';
import { DoctorsRepository } from './doctors.repository';

@Injectable()
export class DoctorsService {
  constructor(private readonly doctorsRepository: DoctorsRepository) {}

  async create(CreateDoctorDto): Promise<any> {
    const doctor = await this.doctorsRepository.createOne(CreateDoctorDto);
    return doctor;
  }

  async findOne(email): Promise<any> {
    const doctor = this.doctorsRepository.findOne(email);
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
    return doctor;
  }
}
