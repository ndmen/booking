import { IsBoolean, IsDate, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateAppointmentDto {
  @ApiProperty()
  @IsDate()
  date: Date;

  @ApiProperty()
  @IsString()
  user: string;

  @ApiProperty()
  @IsString()
  doctor: string;

  @ApiProperty()
  @IsBoolean()
  active: boolean;
}
