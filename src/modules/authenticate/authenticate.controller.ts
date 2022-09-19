import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GoogleAuthenticateUseCase } from "./useCases/GoogleAuthenticateUseCase";
import { SignInUseCase } from "./useCases/SignInUseCase";

@Controller('authenticate')
export class AuthenticateController {
    constructor(
        private googleAuthenticateUseCase: GoogleAuthenticateUseCase,
        private signInUseCase: SignInUseCase
    ) { }

    @Post('google')
    googleAuthenticate(@Body() data: { token: string }) {
        return this.googleAuthenticateUseCase.execute(data.token);
    }

    @UseGuards(AuthGuard('localStrategyUser'))
    @Post('')
    authenticate(@Req() req: any) {
        return this.signInUseCase.execute(req.user);
    }
}