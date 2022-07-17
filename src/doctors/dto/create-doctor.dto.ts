import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDoctorDto {
  @ApiProperty()
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
  @IsString()
  type: string;

  @ApiProperty()
  @IsString()
  spec: string;

  @ApiProperty()
  @IsBoolean()
  free: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  appointments_accepted: string;
}
