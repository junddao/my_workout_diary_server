import { InSignUpDto } from './dto/in_sign_up.dto';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { User } from './schemas/user.schema';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { InSignInDto } from './dto/in_sign_in.dto';
import { InUpdateUserDto } from './dto/in_update_user.dto';
import { InSignInKakaoDto } from './dto/in_sign_in_kakao.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/me')
  @UseGuards(AuthGuard())
  async getMe(@GetUser() user: User): Promise<User> {
    return this.authService.getMe(user);
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return this.authService.getUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    return this.authService.getUser(id);
  }

  @Post('/signup')
  async signUp(@Body() requestSignUpDto: InSignUpDto): Promise<void> {
    return this.authService.signUp(requestSignUpDto);
  }
  @Post('/signin')
  async signIn(
    @Body() inSingInDto: InSignInDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(inSingInDto);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() inUpdateUserDto: InUpdateUserDto,
  ): Promise<User> {
    return this.authService.updateUser(id, inUpdateUserDto);
  }

  @Post('/kakao')
  signInKakao(
    @Body() inSignInKakao: InSignInKakaoDto,
  ): Promise<{ token: string }> {
    return this.authService.signInKakao(inSignInKakao);
  }
}
