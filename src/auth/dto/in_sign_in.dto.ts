import { isNotEmpty, IsNotEmpty } from 'class-validator';

export class InSignInDto {
  @IsNotEmpty()
  fbUid: string;

  // @IsNotEmpty()
  // password: string;
}
