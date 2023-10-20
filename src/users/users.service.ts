import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dtos/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  public async findOne(email: string) {
    return await this.userModel
      .findOne({
        email,
      })
      .exec();
  }

  public async create(userDto: UserDto) {
    const user = new this.userModel({
      ...userDto,
      password: bcrypt.hashSync(userDto?.password, 10),
    });
    return await user.save();
  }
}
