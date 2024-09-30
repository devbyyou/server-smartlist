import { Module } from '@nestjs/common';
import { OpenfoodfactsService } from './openfoodfacts.service';
import { AxiosModule } from 'src/axios/axios.module';
import { OpenfoodfactsController } from './openfoodfacts.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AxiosService } from 'src/axios/axios.service';

@Module({
  controllers: [OpenfoodfactsController],
  providers: [OpenfoodfactsService],
  imports: [AxiosModule, DatabaseModule], // Importer AxiosModule pour que AxiosService soit disponible
  exports: [OpenfoodfactsService]
})
export class OpenfoodfactsModule { }
