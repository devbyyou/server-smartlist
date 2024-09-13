import { Test, TestingModule } from '@nestjs/testing';
import { ListesCoursesController } from './listes-courses.controller';

describe('ListesCoursesController', () => {
  let controller: ListesCoursesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListesCoursesController],
    }).compile();

    controller = module.get<ListesCoursesController>(ListesCoursesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
