import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(CreateUserDto): Promise<any> {
    const user = await this.usersRepository.createOne(CreateUserDto);
    return user;
  }

  async findOne(email): Promise<any> {
    const user = this.usersRepository.findOne(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
