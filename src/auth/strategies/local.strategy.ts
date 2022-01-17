import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportModule, PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){

    constructor(
        private readonly authService: AuthService
    ){
        super({
            usernameField: 'email',
            passwordField: 'password'
        })
    }

    async validate(email: string, password: string){
        console.log(email, password);
        const user = await this.authService.validateUser(email, password);
        if(!user) throw new UnauthorizedException('Login user or password does match');
        return user;
    }
}