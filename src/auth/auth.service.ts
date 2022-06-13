import { InSignUpDto } from './dto/in_sign_up.dto';
import { UsersRepository } from './users.repository';
import { HttpService, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { InUpdateUserDto } from './dto/in_update_user.dto';
import qs from 'qs';
import { InSignInDto } from './dto/in_sign_in.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

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

  async signIn(inSignInDto: InSignInDto): Promise<{ accessToken: string }> {
    const { email } = inSignInDto;
    const user = await this.usersRepository.findOne({ email });

    // if (user && (await bcrypt.compare(password, user.password))) {
    const payload = { email };
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
    // } else {
    //   throw new UnauthorizedException('login failed');
    // }
  }

  async updateUser(
    id: string,
    inUpdateUserDto: InUpdateUserDto,
  ): Promise<User> {
    return this.usersRepository.findOneAndUpdate({ id }, inUpdateUserDto);
  }
}

@Injectable()
export class KakaoService {
  private http: HttpService;
  constructor() {
    this.http = new HttpService();
  }
  async getUserInfo(access_token: string) {
    //console.log(access_token);
    return await fetch('https://kapi.kakao.com/v2/user/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }).then((res) => res.json());
  }

  // async kakaoLogin(url: string, headers: any): Promise<any> {
  //   return await this.http.post(url, '', { headers }).toPromise();
  // }

  async getToken(
    token: string,
    client_id: string,
    redirect_uri: string,
  ): Promise<any> {
    return await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: qs.stringify({
        grant_type: 'authorization_code',
        client_id: client_id,
        redirect_uri: redirect_uri,
        code: token,
      }),
    }).then((res) => res.json());
  }

  async logoutToken(access_token: string) {
    const respone = await fetch('https://kapi.kakao.com/v1/user/unlink', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${access_token}`,
      },
    }).then((res) => res.json());
    console.log(respone);
  }
}
