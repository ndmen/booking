import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(CreateUserDto): Promise<any> {
    const user = await this.usersRepository.createOne(CreateUserDto);
    return user;
  }

  async findUserByEmail(email): Promise<any> {
    const user = this.usersRepository.findOne(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateAppointment(user, appointment): Promise<any> {
    const updatedUser = this.usersRepository.updateOne(user, appointment);
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  async removeAppointment(user, appointment): Promise<any> {
    const updatedUser = this.usersRepository.removeOne(user, appointment);
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }
}
