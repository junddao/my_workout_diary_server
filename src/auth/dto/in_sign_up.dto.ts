import { IsNotEmpty } from 'class-validator';

export class InSignUpDto {
  @IsNotEmpty()
  uid: string;
  @IsNotEmpty()
  social: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  name: string;
  photoUrl: string;
}
