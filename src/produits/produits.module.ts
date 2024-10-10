import { Module } from '@nestjs/common';
import { ProduitsService } from './produits.service';
import { ProduitsController } from './produits.controller';
import { OpenfoodfactsModule } from '../openfoodfacts/openfoodfacts.module';
import { AxiosService } from '../axios/axios.service';
import { DatabaseModule } from '../database/database.module';
import { OpenfoodfactsService } from '../openfoodfacts/openfoodfacts.service';
import { CategorieService } from '../categorie/categorie.service';

@Module({
  controllers: [ProduitsController],
  providers: [ProduitsService, CategorieService],
  imports: [OpenfoodfactsModule, DatabaseModule],

})
export class ProduitsModule { }
