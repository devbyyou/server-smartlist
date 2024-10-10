/* eslint-disable prettier/prettier */
import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth/jwt-auth.guard';

@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() body: { email: string; password: string }) {
        const user = await this.authService.validateUser(body.email, body.password);
        if (user) {
            return this.authService.login(user);
        }
        return { error: 'Password or Email is invalid try again or Sign up' };
    }

    @Post('register')
    async register(@Body() body: { email: string; password: string; name?: string }) {
        return this.authService.register(body);
    }
    // Route protégée par JWT pour obtenir les informations du profil utilisateur

    @UseGuards(JwtAuthGuard)
    @Post('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}