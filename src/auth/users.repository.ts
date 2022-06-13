import { InUpdateUserDto } from './dto/in_update_user.dto';
import { InSignUpDto } from './dto/in_sign_up.dto';
import { User, UserDocument } from './schemas/user.schema';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
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

  async create(createUserDto: InSignUpDto): Promise<void> {
    // const salt = await bcrypt.genSalt();
    // const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const user = {
      email: createUserDto.email,
      // password: hashedPassword,
    };
    try {
      await this.userModel.create(user);
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
    const updateUser = inUpdateUserDto;

    return this.userModel.findOneAndUpdate(userFilterQuery, updateUser);
  }
}
