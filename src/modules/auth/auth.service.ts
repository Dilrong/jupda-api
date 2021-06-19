import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { UsersService } from '../users/users.service';
import { LoginPayload, ResponseLogin } from './authDTO';

interface JWTData {
  userId: number;
  type: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(payload: LoginPayload): Promise<ResponseLogin> {
    const user = await this.usersService.getByEmail(payload.email);

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    if (!bcrypt.compareSync(payload.password, user.password)) {
      throw new BadRequestException('Invalid credentials');
    }
    const accessToken = this.createAccessToken({
      userId: user.id,
      type: user.type,
    });

    return {
      accessToken,
      userId: user.id,
    };
  }

  private createAccessToken(data: JWTData) {
    const { userId, type } = data;
    const payload = { sub: userId, type };
    return this.jwtService.sign(payload);
  }
}
