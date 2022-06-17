import { OutSignInKakaoDto } from './dto/out_sign_in_kakao.dto';
import { OutGetUserDto } from './dto/out_get_user.dto';
import { InSignUpDto } from './dto/in_sign_up.dto';
import { UserService } from './user.service';
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
import { InSignInDto } from './dto/in_sign_in.dto';
import { InUpdateUserDto } from './dto/in_update_user.dto';
import { InSignInKakaoDto } from './dto/in_sign_in_kakao.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OutGetMeDto } from './dto/out_get_me.dto';
import { OutSignInDto } from './dto/out_sign_in.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly authService: UserService) {}

  @ApiOperation({ summary: '내 정보 조회' })
  @ApiResponse({
    type: OutGetMeDto,
    description: 'success',
    status: 200,
  })
  @Get('/me')
  @UseGuards(AuthGuard())
  async getMe(@Req() req): Promise<OutGetMeDto> {
    console.log(req);
    const outGetMeDto = await this.authService.getMe(req.user);
    return outGetMeDto;
  }

  @ApiOperation({ summary: '전체 유저 목록 조회' })
  @Get('/all')
  @UseGuards(AuthGuard())
  async getUsers(): Promise<User[]> {
    return this.authService.getUsers();
  }

  @ApiOperation({ summary: 'id로 유저 목록 조회' })
  @ApiResponse({
    type: OutGetUserDto,
    description: 'success',
    status: 200,
  })
  @Get('/get/:id')
  @UseGuards(AuthGuard())
  async getUser(@Param('id') id: string): Promise<User> {
    const outGetUserDto = await this.authService.getUser(id);
    return outGetUserDto;
  }

  @ApiOperation({ summary: '회원가입' })
  @Post('/signup')
  async signUp(@Body() requestSignUpDto: InSignUpDto): Promise<void> {
    return this.authService.signUp(requestSignUpDto);
  }

  @ApiOperation({ summary: '로그인' })
  @ApiResponse({
    type: OutSignInDto,
    description: 'success',
    status: 200,
  })
  @Post('/signin')
  async signIn(
    @Body() inSingInDto: InSignInDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(inSingInDto);
  }

  @ApiOperation({ summary: '유저 정보 업데이트' })
  @Patch('/update/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() inUpdateUserDto: InUpdateUserDto,
  ): Promise<User> {
    return this.authService.updateUser(id, inUpdateUserDto);
  }

  @ApiOperation({ summary: '카카오 로그인' })
  @ApiResponse({
    type: OutSignInKakaoDto,
    description: 'success',
    status: 200,
  })
  @Post('/kakao')
  async signInKakao(
    @Body() inSignInKakao: InSignInKakaoDto,
  ): Promise<OutSignInKakaoDto> {
    const fbCustomToken = await this.authService.signInKakao(inSignInKakao);
    return fbCustomToken;
  }
}