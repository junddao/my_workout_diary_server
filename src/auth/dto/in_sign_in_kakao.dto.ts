import { isNotEmpty, IsNotEmpty } from 'class-validator';

export class InSignInKakaoDto {
  @IsNotEmpty()
  email: string;
  // @IsNotEmpty()
  // password: string;

  uid: string;

  name: string;

  photoUrl: string;
}
