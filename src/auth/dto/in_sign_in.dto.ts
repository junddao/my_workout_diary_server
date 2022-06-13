import { isNotEmpty, IsNotEmpty } from 'class-validator';

export class InSignInDto {
  @IsNotEmpty()
  email: string;
  // @IsNotEmpty()
  // password: string;
}
