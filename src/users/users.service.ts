import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { MongoIdDto } from './dtos/mongo-id.dto';
import { I18nService, I18nContext } from 'nestjs-i18n';
import { CustomI18nService } from '../custom-i18n';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private i18n: CustomI18nService,
  ) {}

  async findUsers(): Promise<User[]> {
    const users = await this.userModel.find();
    const localizedUsers = this.userModel.schema.methods.toObjectLocalizedOnly(users, I18nContext.current().lang)
    return localizedUsers;
  }

  async findUserById(id: MongoIdDto): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(this.i18n.translate('users.NOT_FOUND'));
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    console.log('====================================');
    console.log("createUserDto",createUserDto);
    console.log('====================================');
    const createUser = await this.userModel.create(createUserDto);
    return createUser;
  }

  async updateUser(
    id: MongoIdDto,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
      { new: true },
    );

    return updatedUser;
  }

  async deleteUser(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id);
  }
}
