import { PartialType } from '@nestjs/mapped-types';
import { CreateDoctorDto } from './create-doctor.dto';

export class UpdateDoctorDto extends PartialType(CreateDoctorDto) {}
