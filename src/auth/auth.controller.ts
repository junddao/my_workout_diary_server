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

@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: AuthService) {}

  @Get('/me')
  @UseGuards(AuthGuard())
  async getMe(@GetUser() user: User): Promise<User> {
    return this.usersService.getMe(user);
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    return this.usersService.getUser(id);
  }

  @Post('/signup')
  async signUp(@Body() requestSignUpDto: InSignUpDto): Promise<void> {
    return this.usersService.signUp(requestSignUpDto);
  }
  @Post('/signin')
  async signIn(
    @Body() requestSignInDto: InSignInDto,
  ): Promise<{ accessToken: string }> {
    return this.usersService.signIn(requestSignInDto);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() inUpdateUserDto: InUpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(id, inUpdateUserDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log('req', req);
  }
}
