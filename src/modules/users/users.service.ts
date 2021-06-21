import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { CreateUserPayload } from './userDTO';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async getById(id: number) {
    return this.userRepo.findOne(id);
  }

  async getByEmail(email: string) {
    return this.userRepo.findOne({
      where: { email: email },
    });
  }

  async registerUser(payload: CreateUserPayload) {
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    return this.userRepo.save({ ...payload, password: hashedPassword });
  }
}
