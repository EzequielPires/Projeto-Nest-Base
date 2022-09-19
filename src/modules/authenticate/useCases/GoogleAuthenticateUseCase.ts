import { Injectable } from "@nestjs/common";
import { google, Auth } from 'googleapis';
import { UserService } from "src/modules/user/user.service";

@Injectable()
export class GoogleAuthenticateUseCase {
    oauthClient: Auth.OAuth2Client;
    constructor(
        private readonly userService: UserService,
    ) {
        this.oauthClient = new google.auth.OAuth2(
            "278897367697-6s6rmf5feqejmo5qheeterekfk5km091.apps.googleusercontent.com",
            "HsxheSC9LcCiIPNdkqKXU5__"
        );
    }

    async execute(token: string) {
        const tokenInfo = await this.oauthClient.getTokenInfo(token);
        const email = tokenInfo.email;
        const user = await this.userService.findByEmail(email);
        if (!email) return null;
        if (!user) return await this.createUser(token);
        return user;
    }

    private async createUser(token: string) {
        const userInfo = await this.getUserInfo(token);
        const user = await this.userService.create({
            name: userInfo.name,
            email: userInfo.email,
            avatarUrl: userInfo.picture,
            isGoogleAuthenticate: true,
            idGoogle: userInfo.id
        });
        return user;
    }

    private async getUserInfo(token: string) {
        const userInfoClient = google.oauth2('v2').userinfo;
        this.oauthClient.setCredentials({
            access_token: token
        });
        const userInfoResponse = await userInfoClient.get({
            auth: this.oauthClient
        });
        return userInfoResponse.data;
    }
}