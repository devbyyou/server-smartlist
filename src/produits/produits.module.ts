import { Module } from '@nestjs/common';
import { ProduitsService } from './produits.service';
import { ProduitsController } from './produits.controller';
import { OpenfoodfactsModule } from 'src/openfoodfacts/openfoodfacts.module';

@Module({
  controllers: [ProduitsController],
  providers: [ProduitsService],
  imports: [OpenfoodfactsModule]
})
export class ProduitsModule {}
