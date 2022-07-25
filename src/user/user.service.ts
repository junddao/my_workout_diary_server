import { InGetTokenDto } from './dto/in_get_token.dto';
import { ResponseDto } from '../common/dto/response.dto';
import { InSignInKakaoDto } from './dto/in_sign_in_kakao.dto';
import { InSignUpDto } from './dto/in_sign_up.dto';
import { UsersRepository } from './users.repository';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { InUpdateUserDto } from './dto/in_update_user.dto';
import { InSignInDto } from './dto/in_sign_in.dto';
import * as firebase from 'firebase-admin';
import * as serviceAccount from './serviceAccountKey.json';
import mongoose, { ObjectId } from 'mongoose';
import { OutSignInDto } from './dto/out_sign_in.dto';
import { OutSignInKakaoDto } from './dto/out_sign_in_kakao.dto';
import { OutGetUserDto } from './dto/out_get_user.dto';
import { throwError } from 'rxjs';
import { InSignInAppleDto } from './dto/in_sign_in_apple.dto';
import * as bcrypt from 'bcryptjs';

const firebase_params = {
  type: serviceAccount.type,
  projectId: serviceAccount.project_id,
  privateKeyId: serviceAccount.private_key_id,
  privateKey: serviceAccount.private_key,
  clientEmail: serviceAccount.client_email,
  clientId: serviceAccount.client_id,
  authUri: serviceAccount.auth_uri,
  tokenUri: serviceAccount.token_uri,
  authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
  clientC509CertUrl: serviceAccount.client_x509_cert_url,
};

@Injectable()
export class UserService {
  private admin: any;

  constructor(
    private readonly usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {
    this.admin = firebase.initializeApp({
      credential: firebase.credential.cert(firebase_params),
    });
  }

  async getMe(user: User): Promise<User> {
    const { _id } = user;
    return this.usersRepository.findOne({ _id });
  }

  async getUsers(): Promise<User[]> {
    return this.usersRepository.find({});
  }
  async getUser(_id: string): Promise<User> {
    return this.usersRepository.findOne({ _id });
  }

  async signUp(inSignUpDto: InSignUpDto): Promise<void> {
    return this.usersRepository.create(inSignUpDto);
  }

  async signIn(inSignInDto: InSignInDto): Promise<OutSignInDto> {
    const { email, password } = inSignInDto;

    const user = await this.usersRepository.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { email };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new ConflictException('user not exist');
    }
  }
  async getToken(InGetTokenDto: InGetTokenDto): Promise<OutSignInDto> {
    const { email } = InGetTokenDto;
    const payload = { email };
    const user = await this.usersRepository.findOne({ email });

    if (user == null) throw new ConflictException('user not exist');

    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }

  async drop(user: User): Promise<boolean> {
    user.status = 'drop';
    const id = user._id;
    const updatedUser = await this.usersRepository.findOneAndUpdate(
      { id },
      user,
    );
    if (updatedUser != null) {
      return true;
    }
  }

  async signInApple(inSignInAppleDto: InSignInAppleDto): Promise<void> {
    const uid = inSignInAppleDto.uid;
    const { email } = inSignInAppleDto;
    const updateParams = {
      email: inSignInAppleDto.email,
      profileImage: inSignInAppleDto.profileImage,
      name: inSignInAppleDto.name,
    };

    const newUser: InSignUpDto = {
      email: updateParams.email,
      name: updateParams.name ?? 'no name',
      profileImage: updateParams.profileImage,
      social: 'apple',
      password: 'apple',
      uid: uid,
    };

    const exist = await this.usersRepository.findOne({ email });
    if (exist != null) {
      return;
    }
    await this.usersRepository.create(newUser);
  }

  async signInKakao(
    inSignInKakaoDto: InSignInKakaoDto,
  ): Promise<OutSignInKakaoDto> {
    const uid = inSignInKakaoDto.uid;
    const updateParams = {
      email: inSignInKakaoDto.email,
      profileImage: inSignInKakaoDto.profileImage,
      name: inSignInKakaoDto.name,
    };
    const { email } = inSignInKakaoDto;

    const exist = await this.usersRepository.findOne({ email });
    if (exist != null) {
      await this.admin.auth().updateUser(uid, updateParams);
    } else {
      updateParams['uid'] = uid;
      updateParams['social'] = 'kakao';

      const newUser: InSignUpDto = {
        email: updateParams.email,
        name: updateParams.name ?? 'no name',
        profileImage: updateParams.profileImage,
        social: 'kakao',
        password: 'kakao',
        uid: uid,
      };
      await this.admin.auth().createUser(newUser);
      await this.usersRepository.create(newUser);
    }

    const fbCustomToken = await this.admin.auth().createCustomToken(uid);

    return { fbCustomToken };
  }

  async updateUser(inUpdateUserDto: InUpdateUserDto): Promise<User> {
    const { email } = inUpdateUserDto;
    return this.usersRepository.findOneAndUpdate({ email }, inUpdateUserDto);
  }
}
