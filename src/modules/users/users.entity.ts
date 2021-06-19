import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  ObjectIdColumn,
} from 'typeorm';
import { UserType } from './userDTO';
import * as bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';

@Entity({ name: 'Users' })
export class User {
  @ObjectIdColumn()
  id: number;

  @Column({ length: 50, unique: true, comment: '이메일' })
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column({ nullable: true, comment: '프로필 이미지' })
  avatar: string;

  @Column({ length: 20, nullable: true, comment: '이름' })
  name: string;

  @Column({ length: 45, nullable: true, comment: '전화번호' })
  phone?: string;

  @Column({ type: 'enum', enum: UserType, nullable: true })
  type: UserType;

  @Column({ default: false, comment: '삭제 여부' })
  isDel: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  async validatePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compareSync(password, hash);
  }

  @BeforeInsert()
  async generateRandom(length: number) {
    this.salt = randomBytes(length)
      .toString('base64')
      .replace(/[^A-Za-z0-9]/g, '');
  }
}
