import { JwtStrategy } from './jwt.strategy';
import { UsersRepository } from './users.repository';
import { User, UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'withWrite',
      signOptions: {
        expiresIn: 60 * 60 * 24 * 90,
      },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserService, UsersRepository, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
  controllers: [UserController],
})
export class UserModule {}
