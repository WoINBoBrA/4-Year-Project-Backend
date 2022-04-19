import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';
import { debug } from 'console';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWTKEY'),
    });
  }

  async validate(user: any) {
    return {
      userId: user.sub,
      login: user.login,
      firstName: user.firstName,
      secondName: user.secondName,
      role: user.role 
    };
  }
}