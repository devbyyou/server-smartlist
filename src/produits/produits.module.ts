import { Module } from '@nestjs/common';
import { ProduitsService } from './produits.service';
import { ProduitsController } from './produits.controller';
import { OpenfoodfactsModule } from 'src/openfoodfacts/openfoodfacts.module';
import { AxiosService } from 'src/axios/axios.service';
import { DatabaseModule } from 'src/database/database.module';
import { OpenfoodfactsService } from 'src/openfoodfacts/openfoodfacts.service';
import { CategorieService } from 'src/categorie/categorie.service';

@Module({
  controllers: [ProduitsController],
  providers: [ProduitsService, CategorieService],
  imports: [OpenfoodfactsModule, DatabaseModule],

})
export class ProduitsModule { }
