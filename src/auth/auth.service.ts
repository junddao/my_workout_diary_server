import { InSignInKakaoDto } from './dto/in_sign_in_kakao.dto';
import { InSignUpDto } from './dto/in_sign_up.dto';
import { UsersRepository } from './users.repository';
import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { InUpdateUserDto } from './dto/in_update_user.dto';
import { InSignInDto } from './dto/in_sign_in.dto';
import * as firebase from 'firebase-admin';
import * as serviceAccount from './serviceAccountKey.json';

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
export class AuthService {
  private admin: any;

  constructor(
    private readonly usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {
    this.admin = firebase.initializeApp({
      credential: firebase.credential.cert(firebase_params),
      // databaseURL: 'https://my-workout-diary-d1093.firebaseio.com',
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

  async signIn(inSignInDto: InSignInDto): Promise<{ accessToken: string }> {
    const { fbUid } = inSignInDto;
    // const user = await this.usersRepository.findOne({ email });

    // if (user && (await bcrypt.compare(password, user.password))) {
    const payload = { fbUid };
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
    // } else {
    //   throw new UnauthorizedException('login failed');
    // }
  }
  async signInKakao(
    inSignInKakaoDto: InSignInKakaoDto,
  ): Promise<{ token: string }> {
    const uid = inSignInKakaoDto.uid;
    const updateParams = {
      email: inSignInKakaoDto.email,
      photoUrl: inSignInKakaoDto.photoUrl,
      name: inSignInKakaoDto.name,
    };

    try {
      await this.admin.auth().updateUser(uid, updateParams);
    } catch (e) {
      updateParams['uid'] = uid;
      updateParams['social'] = 'kakao';

      const newUser = new InSignUpDto();
      newUser.email = updateParams.email;
      newUser.name = updateParams.name;
      newUser.photoUrl = updateParams.photoUrl;
      newUser.social = 'kakao';
      newUser.uid = uid;

      await this.admin.auth().createUser(newUser);

      this.usersRepository.create(newUser);
    }

    const token = await this.admin.auth().createCustomToken(uid);

    return { token };
  }

  async updateUser(
    id: string,
    inUpdateUserDto: InUpdateUserDto,
  ): Promise<User> {
    return this.usersRepository.findOneAndUpdate({ id }, inUpdateUserDto);
  }
}

// @Injectable()
// export class KakaoService {
//   private http: HttpService;
//   constructor() {
//     this.http = new HttpService();
//   }
//   async getUserInfo(access_token: string) {
//     //console.log(access_token);
//     return await fetch('https://kapi.kakao.com/v2/user/me', {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${access_token}`,
//       },
//     }).then((res) => res.json());
//   }

//   // async kakaoLogin(url: string, headers: any): Promise<any> {
//   //   return await this.http.post(url, '', { headers }).toPromise();
//   // }

//   async getToken(
//     token: string,
//     client_id: string,
//     redirect_uri: string,
//   ): Promise<any> {
//     return await fetch('https://kauth.kakao.com/oauth/token', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//       body: qs.stringify({
//         grant_type: 'authorization_code',
//         client_id: client_id,
//         redirect_uri: redirect_uri,
//         code: token,
//       }),
//     }).then((res) => res.json());
//   }

//   async logoutToken(access_token: string) {
//     const respone = await fetch('https://kapi.kakao.com/v1/user/unlink', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         Authorization: `Bearer ${access_token}`,
//       },
//     }).then((res) => res.json());
//     console.log(respone);
//   }
// }
