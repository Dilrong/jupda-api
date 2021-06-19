import {
  Body,
  Controller,
  HttpException,
  InternalServerErrorException,
  Logger,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserPayload } from './userDTO';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('register')
  async postRegister(@Body() createUserPayload: CreateUserPayload) {
    return this.userService.registerUser(createUserPayload).catch((err) => {
      if (err instanceof HttpException) {
        throw err;
      }
      Logger.error(err);
      throw new InternalServerErrorException({ msg: err.message });
    });
  }
}
