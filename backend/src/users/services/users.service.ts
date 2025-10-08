import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { User } from '@app/users/schema/users.schema';
import { Model } from 'mongoose';
import { BaseResponse } from '@app/shared/interfaces/base-response';
import { CreateUserDto } from '@app/users/dto/create-user.dto';
import { UserDto } from '@app/shared/dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async createUser(userData: CreateUserDto): Promise<BaseResponse<User>> {
    const createdUser = await this.userModel.create(userData);

    return {
      data: createdUser,
      status: 201,
    };
  }

  async findByEmail(
    email: string,
    options?: {
      password: boolean;
    },
  ): Promise<BaseResponse<UserDto>> {
    let query = this.userModel.findOne().where({ email });
    if (options?.password) {
      query = query.select('+password');
    }
    const user = await query.exec();
    if (!user) {
      throw new NotFoundException('No se encontro el usuario');
    }
    return {
      data: {
        ...user,
        password: options?.password ? user.password : undefined,
        _id: user._id.toString(),
      },
      status: 200,
    };
  }

  async findById(id: string): Promise<BaseResponse<UserDto>> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('No se encontro el usuario');
    }
    return {
      data: {
        ...user,
        _id: user._id.toString(),
      },
      status: 200,
    };
  }
}
