import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as hashingService from './hashing.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, pass: string): Promise<any> {
    const user = await this.usersService.findByLogin(login);
    if (!user) return null;
    if (!(await hashingService.validate(pass, user.password))) return;
    const result = {
      sub: user.id,
      login: user.login,
      firstName: user.firstName,
      secondName: user.secondName,
      role: user.role,
    };
    return result;
  }

  async login(user: any) {
    return {
      access_token: this.jwtService.sign(user),
      role:user.role,
      firstName: user.firstName,
      secondName: user.secondName,
      userId: user.sub
    };
  }
}
