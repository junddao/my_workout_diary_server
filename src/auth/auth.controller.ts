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
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '내 정보 조회' })
  @Get('/me')
  @UseGuards(AuthGuard())
  async getMe(@Req() req): Promise<User> {
    return this.authService.getMe(req.user);
  }

  @ApiOperation({ summary: '전체 유저 목록 조회' })
  @Get()
  async getUsers(): Promise<User[]> {
    return this.authService.getUsers();
  }

  @ApiOperation({ summary: 'id로 유저 목록 조회' })
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    return this.authService.getUser(id);
  }

  @ApiOperation({ summary: '회원가입' })
  @Post('/signup')
  async signUp(@Body() requestSignUpDto: InSignUpDto): Promise<void> {
    return this.authService.signUp(requestSignUpDto);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('/signin')
  async signIn(
    @Body() inSingInDto: InSignInDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(inSingInDto);
  }

  @ApiOperation({ summary: '유저 정보 업데이트' })
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() inUpdateUserDto: InUpdateUserDto,
  ): Promise<User> {
    return this.authService.updateUser(id, inUpdateUserDto);
  }

  @ApiOperation({ summary: '카카오 로그인' })
  @Post('/kakao')
  signInKakao(
    @Body() inSignInKakao: InSignInKakaoDto,
  ): Promise<{ token: string }> {
    return this.authService.signInKakao(inSignInKakao);
  }
}
