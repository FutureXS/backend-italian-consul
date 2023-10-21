import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  public async getAll(skip = 0, limit = 10) {
    const count = await this.userModel.countDocuments().exec();
    const totalPages = Math.ceil(count / limit);
    const users = await this.userModel
      .find()
      .skip(skip)
      .limit(limit)
      .sort({
        created_at: 'desc',
      })
      .exec();
    return {
      totalPages,
      users,
    };
  }

  public async findOne(email: string) {
    return await this.userModel
      .findOne({
        email,
      })
      .exec();
  }

  public async create(userDto: CreateUserDto) {
    const user = new this.userModel({
      ...userDto,
      password: bcrypt.hashSync(userDto?.password, 10),
    });
    return await user.save();
  }

  public async update(id: string, userDto: UpdateUserDto) {
    const user = await this.userModel.findById(new Types.ObjectId(id)).exec();
    return await user
      .updateOne({
        ...userDto,
        ...(userDto?.password && {
          password: bcrypt.hashSync(userDto?.password, 10),
        }),
      })
      .exec();
  }

  public async delete(id: string) {
    return await this.userModel
      .findByIdAndDelete(new Types.ObjectId(id))
      .exec();
  }
}
