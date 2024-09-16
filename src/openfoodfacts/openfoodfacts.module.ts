import { Module } from '@nestjs/common';
import { OpenfoodfactsService } from './openfoodfacts.service';
import { AxiosModule } from 'src/axios/axios.module';

@Module({
  imports: [AxiosModule], // Importer AxiosModule pour que AxiosService soit disponible
  providers: [OpenfoodfactsService],
  exports: [OpenfoodfactsService]
})
export class OpenfoodfactsModule {}
