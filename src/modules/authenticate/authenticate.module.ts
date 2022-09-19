import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AuthenticateController } from "./authenticate.controller";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";
import { GoogleAuthenticateUseCase } from "./useCases/GoogleAuthenticateUseCase";
import { ValidateUserUseCase } from "./useCases/ValidateUserUseCase";
import { JwtModule } from '@nestjs/jwt';
import { SignInUseCase } from "./useCases/SignInUseCase";
import { UserModule } from "src/modules/user/user.module";

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            privateKey: 'YXNkY2RrZnVlYmFzamJkYXNsa2ZmZHNoZ3BvamFzZGZqaWhhb2RpamZpYWJzZGZpam5zYWRrbA==',
            signOptions: { expiresIn: '3600s' },
        }),
        UserModule
    ],
    controllers: [AuthenticateController],
    providers: [
        //UseCases
        GoogleAuthenticateUseCase,
        ValidateUserUseCase,
        SignInUseCase,

        //Strategies
        LocalStrategy,
        JwtStrategy
    ]
}) export class AuthenticateModule {}