import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AcceptAppointmentDto {
  @ApiProperty()
  @IsString()
  appointment_id: string;
}
