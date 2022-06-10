import { IsNotEmpty } from 'class-validator';

export class InSignUpDto {
  @IsNotEmpty()
  email: string;
}
