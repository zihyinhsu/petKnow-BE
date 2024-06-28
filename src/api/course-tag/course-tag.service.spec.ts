import { Test, TestingModule } from '@nestjs/testing';
import { CourseTagService } from './course-tag.service';

describe('CourseTagService', () => {
  let service: CourseTagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseTagService],
    }).compile();

    service = module.get<CourseTagService>(CourseTagService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
