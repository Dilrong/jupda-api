import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString } from 'class-validator';

export enum UserType {
  AMDIN = 'admin',
  USER = 'user',
}

export class CreateUserPayload {
  @ApiProperty({ description: '이메일' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: '비밀번호' })
  @IsString()
  password: string;

  @ApiProperty({ description: '이름' })
  @IsString()
  name: string;

  @ApiProperty({ description: '유저 타입' })
  @IsEnum(UserType)
  type: UserType;
}
