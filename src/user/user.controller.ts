import { OutCommonDto } from './../common/dto/out_common.dto';
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
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '내 정보 조회' })
  @ApiResponse({
    type: OutGetMeDto,
    description: 'success',
    status: 200,
  })
  @Get('/me')
  @UseGuards(AuthGuard())
  async getMe(@Req() req): Promise<OutCommonDto<OutGetMeDto>> {
    console.log(req);
    const data = await this.userService.getMe(req.user);
    return {
      success: true,
      error: null,
      data: data,
    };
  }

  @ApiOperation({ summary: '전체 유저 목록 조회' })
  @Get('/all')
  @UseGuards(AuthGuard())
  async getUsers(): Promise<OutCommonDto<User[]>> {
    const data = await this.userService.getUsers();
    return {
      success: true,
      error: null,
      data: data,
    };
  }

  @ApiOperation({ summary: 'id로 유저 목록 조회' })
  @ApiResponse({
    type: OutGetUserDto,
    description: 'success',
    status: 200,
  })
  @Get('/get/:id')
  @UseGuards(AuthGuard())
  async getUser(@Param('id') id: string): Promise<OutCommonDto<User>> {
    const data = await this.userService.getUser(id);
    return {
      success: true,
      error: null,
      data: data,
    };
  }

  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({
    type: OutCommonDto,
    description: 'success',
    status: 200,
  })
  @Post('/signup')
  async signUp(
    @Body() requestSignUpDto: InSignUpDto,
  ): Promise<OutCommonDto<null>> {
    await this.userService.signUp(requestSignUpDto);
    return {
      success: true,
      error: null,
      data: null,
    };
  }

  @ApiOperation({ summary: '회원탈퇴' })
  @ApiResponse({
    type: OutCommonDto,
    description: 'success',
    status: 200,
  })
  @Get('/drop')
  @UseGuards(AuthGuard())
  async Drop(@Req() req): Promise<OutCommonDto<boolean>> {
    const data = await this.userService.drop(req.user);
    return {
      success: true,
      error: null,
      data: data,
    };
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
  ): Promise<OutCommonDto<{ accessToken: string }>> {
    const data = await this.userService.signIn(inSingInDto);
    return {
      success: true,
      error: null,
      data: data,
    };
  }

  @ApiOperation({ summary: '유저 정보 업데이트' })
  @Patch('/update/:id')
  @UseGuards(AuthGuard())
  async updateUser(
    @Param('id') id: string,
    @Body() inUpdateUserDto: InUpdateUserDto,
  ): Promise<OutCommonDto<User>> {
    const data = await this.userService.updateUser(id, inUpdateUserDto);
    return {
      success: true,
      error: null,
      data: data,
    };
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
  ): Promise<OutCommonDto<OutSignInKakaoDto>> {
    const data = await this.userService.signInKakao(inSignInKakao);
    return {
      success: true,
      error: null,
      data: data,
    };
  }
}
