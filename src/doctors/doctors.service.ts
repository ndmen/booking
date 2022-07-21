import { Injectable, NotFoundException } from '@nestjs/common';
import { DoctorsRepository } from './doctors.repository';

@Injectable()
export class DoctorsService {
  constructor(private readonly doctorsRepository: DoctorsRepository) {}

  async createDoctor(CreateDoctorDto): Promise<any> {
    const doctor = await this.doctorsRepository.createOne(CreateDoctorDto);
    return doctor;
  }

  async findDoctorByEmail(email): Promise<any> {
    const doctor = this.doctorsRepository.findOne(email);
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
    return doctor;
  }

  async findDoctorById(doctor_id): Promise<any> {
    const doctor = this.doctorsRepository.findOneById(doctor_id);
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
    return doctor;
  }

  async updateAppointment(doctor_id, appointment_id): Promise<any> {
    const doctor = await this.findDoctorById(doctor_id);
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
    const updatedDoctor = this.doctorsRepository.updateOne(
      doctor._id,
      appointment_id,
    );
    return updatedDoctor;
  }
}
