import { Injectable } from "@nestjs/common";
import { compareSync } from "bcrypt";
import { UserService } from "src/modules/user/user.service";

@Injectable()
export class ValidateUserUseCase {
    constructor(private userService: UserService) {}

    async execute(email: string, password: string) {
        let user: any;
        try {
            user = await this.userService.findByEmail(email);
            console.log(email);
            if(!user) {
                throw new Error('Email or password invalid!');
            }
            const passwordMatch = compareSync(password, user.password);
            if(!passwordMatch) {
                throw new Error('Email or password invalid!');
            }
            return user;
        } catch {
            return null;
        }
    }
}