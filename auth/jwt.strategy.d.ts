import { Strategy } from 'passport-jwt';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(user: any): Promise<{
        userId: any;
        login: any;
        firstName: any;
        secondName: any;
        role: any;
    }>;
}
export {};
