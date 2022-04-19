import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor(config: ConfigService);
    validate(user: any): Promise<{
        userId: any;
        login: any;
        firstName: any;
        secondName: any;
        role: any;
    }>;
}
export {};
