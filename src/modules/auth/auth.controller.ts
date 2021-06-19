import {
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Logger,
  Post,
  Body,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginPayload, ResponseLogin } from './authDTO';

@Controller('auth')
@ApiTags('인증')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '로그인', description: '로그인' })
  @ApiResponse({ status: 200, type: ResponseLogin, description: '로그인 성공' })
  @ApiResponse({ status: 400, description: '로그인 실패' })
  public async postLogin(
    @Body() payload: LoginPayload,
  ): Promise<ResponseLogin> {
    return this.authService.login(payload).catch((err: Error) => {
      if (err instanceof HttpException) {
        throw err;
      }

      Logger.error(err);
      throw new InternalServerErrorException('fail to login');
    });
  }
}
