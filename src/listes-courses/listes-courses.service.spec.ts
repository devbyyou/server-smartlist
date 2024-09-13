import { Test, TestingModule } from '@nestjs/testing';
import { ListesCoursesService } from './listes-courses.service';

describe('ListesCoursesService', () => {
  let service: ListesCoursesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListesCoursesService],
    }).compile();

    service = module.get<ListesCoursesService>(ListesCoursesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
