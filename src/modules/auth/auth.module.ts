import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register({
      secret: '' + process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: '14d',
      },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
