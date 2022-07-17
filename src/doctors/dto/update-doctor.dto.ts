import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDoctorDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  reg_token: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  photo_avatar: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  type: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  spec: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  free: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  appointments_accepted: string;
}
