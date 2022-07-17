import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateAppointmentDto {
  @ApiProperty()
  @IsDate()
  @IsOptional()
  date: Date;

  @ApiProperty()
  @IsString()
  @IsOptional()
  user: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  doctor: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  active: boolean;
}
