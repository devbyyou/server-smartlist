import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt-strategy/jwt-strategy.service';
import { DatabaseService } from '../database/database.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(), // Charger les variables d'environnement
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn:
           `${configService.get<string>('JWT_EXPIRATION_TIME')}s`,
        },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}