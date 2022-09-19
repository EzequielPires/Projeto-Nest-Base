import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class SignInUseCase {
    constructor(private readonly jwtService: JwtService) {}

    async execute(user: any) {
        const payload = { 
            sub: user.id, 
            name: user.name,
            email: user.email,
            avatarUrl: user.avatarUrl
        };
        
        return {
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                avatarUrl: user.avatarUrl
            },
            token: this.jwtService.sign(payload),
        };
    }
}