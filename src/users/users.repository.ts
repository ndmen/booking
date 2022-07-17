import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDo } from 'src/_schemas/user.do';

export class UsersRepository {
  constructor(
    @InjectModel('User')
    private userModel: Model<UserDo>,
  ) {}

  async createOne(user): Promise<any> {
    const createOne = await this.userModel.create(user);
    return createOne;
  }

  async findOne(email): Promise<any> {
    const findOne = await this.userModel.findOne({ email: email });
    return findOne;
  }

  async updateOne(user, appointment): Promise<any> {
    const updateOne = await this.userModel.updateOne(
      { _id: user },
      { $push: { appointments: appointment } },
    );
    return updateOne;
  }
}
