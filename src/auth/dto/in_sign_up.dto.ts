import { IsNotEmpty } from 'class-validator';

export class InSignUpDto {
  @IsNotEmpty()
  social: string;
  @IsNotEmpty()
  email: string;
}
