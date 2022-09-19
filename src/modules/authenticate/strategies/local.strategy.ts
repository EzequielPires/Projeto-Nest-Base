import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { ValidateUserUseCase } from "../useCases/ValidateUserUseCase";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'localStrategyUser') {
    constructor(private validateUserUseCase: ValidateUserUseCase) {
        super({ usernameField: 'email' });
    }

    async validate(email: string, password: string): Promise<any> {
        const user = await this.validateUserUseCase.execute(email, password);
        if(!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}