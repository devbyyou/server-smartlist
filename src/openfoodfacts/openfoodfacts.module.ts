import { Module } from '@nestjs/common';
import { OpenfoodfactsService } from './openfoodfacts.service';
import { AxiosModule } from 'src/axios/axios.module';
import { OpenfoodfactsController } from './openfoodfacts.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AxiosService } from 'src/axios/axios.service';

@Module({
  imports: [AxiosModule, DatabaseModule], // Importer AxiosModule pour que AxiosService soit disponible
  providers: [OpenfoodfactsService, AxiosModule, AxiosService],
  exports: [OpenfoodfactsService],
  controllers: [OpenfoodfactsController]
})
export class OpenfoodfactsModule { }
