import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

import { ProduitsModule } from './produits/produits.module';
import { AuthModule } from './auth/auth.module';
import { ListesCoursesModule } from './listes-courses/listes-courses.module';
import { AxiosModule } from './axios/axios.module';
import { OpenfoodfactsModule } from './openfoodfacts/openfoodfacts.module';
import { CategorieModule } from './categorie/categorie.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Rendre ConfigModule global, pas besoin de l'importer dans d'autres modules
    }),
    DatabaseModule, ProduitsModule, AuthModule, ListesCoursesModule, AxiosModule, OpenfoodfactsModule, CategorieModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
