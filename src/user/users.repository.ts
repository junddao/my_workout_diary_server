import {
  ConflictException,
  ConsoleLogger,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { InSignUpDto } from './dto/in_sign_up.dto';
import { InUpdateUserDto } from './dto/in_update_user.dto';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(userFilterQuery: FilterQuery<User>): Promise<User> {
    return this.userModel.findOne(userFilterQuery);
  }

  async find(userFilterQuery: FilterQuery<User>): Promise<User[]> {
    return this.userModel.find(userFilterQuery);
  }

  async create(inSignUpDto: InSignUpDto): Promise<void> {
    try {
      const { password } = inSignUpDto;

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      inSignUpDto.password = hashedPassword;

      const newUser = { ...inSignUpDto, status: 'active' };
      await this.userModel.create(newUser);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('exist username');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findOneAndUpdate(
    userFilterQuery: FilterQuery<User>,
    inUpdateUserDto: InUpdateUserDto,
  ): Promise<User> {
    // const { email, password, name } = authCredentialsDto;
    // const { name, profileImage, status } = inUpdateUserDto;
    console.log(userFilterQuery);

    try {
      return this.userModel.findOneAndUpdate(userFilterQuery, inUpdateUserDto, {
        new: true,
      });
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async findOneAndDrop(
    userFilterQuery: FilterQuery<User>,
    updateFilterQuery: FilterQuery<User>,
  ): Promise<User> {
    const { status } = updateFilterQuery;
    console.log(userFilterQuery);

    try {
      return this.userModel.findOneAndUpdate(
        userFilterQuery,
        { status },
        {
          new: true,
        },
      );
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
