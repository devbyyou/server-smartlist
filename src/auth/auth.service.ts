/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly jwtService: JwtService,
    ) { }

    // Validation de l'utilisateur avec Prisma
    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.databaseService.utilisateur.findUnique({
            where: { email },
        });

        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    // Génération du JWT
    async login(user: any) {
        const logged = true;
        const payload = { username: user.email, sub: user.id };

        return {
            access_token: this.jwtService.sign(payload),
            logged
        };
    }

    // Inscription d'un nouvel utilisateur
    async register(createUserInput: Prisma.UtilisateurCreateInput) {
        const hashedPassword = await bcrypt.hash(createUserInput.password, 10);
        const user = await this.databaseService.utilisateur.findUnique({
            where: { email: createUserInput.email },
        });
        try {

            if (!user) {
                return this.databaseService.utilisateur.create({
                data: {
                    email: createUserInput.email,
                    name: createUserInput.name,
                    password: hashedPassword,
                },
                });    
            } else {

                return { error: 'Cet utilisateur existe déjà !' };
            }
        } catch (error) {

            return { error: 'Veuillez vérifier les champs' };
        }
    }
}