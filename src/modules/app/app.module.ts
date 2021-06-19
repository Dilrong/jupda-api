import { Module } from '@nestjs/common';
import { AuthModule } from '../auth';
import { ConfigModule } from '../config';
import { DataBaseModule } from '../database/database.module';
import { UsersModule } from '../users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [AuthModule, DataBaseModule, ConfigModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
