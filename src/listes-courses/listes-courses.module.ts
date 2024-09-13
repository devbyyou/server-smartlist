import { Module } from '@nestjs/common';
import { ListesCoursesService } from './listes-courses.service';
import { ListesCoursesController } from './listes-courses.controller';

@Module({
  providers: [ListesCoursesService],
  controllers: [ListesCoursesController]
})
export class ListesCoursesModule {}
