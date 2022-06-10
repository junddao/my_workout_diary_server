import { IsNotEmpty } from 'class-validator';

export class InUpdateUserDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  nickname: string;

  @IsNotEmpty()
  introduce: string;

  @IsNotEmpty()
  profileImage: string;

  // @IsNotEmpty()
  // status (signed, active, left)

  @IsNotEmpty()
  pushEnabled: boolean;

  @IsNotEmpty()
  agreeTerms: boolean;

  @IsNotEmpty()
  createdAt: Date;

  @IsNotEmpty()
  updatedAt: Date;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  name: string;
}
