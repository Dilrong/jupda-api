import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from '../config';
import { User } from './users.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([User]), PassportModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [PassportModule, UsersService],
})
export class UsersModule {}
