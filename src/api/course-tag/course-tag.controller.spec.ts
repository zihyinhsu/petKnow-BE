import { Test, TestingModule } from '@nestjs/testing';
import { CourseTagController } from './course-tag.controller';

describe('CourseTagController', () => {
  let controller: CourseTagController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseTagController],
    }).compile();

    controller = module.get<CourseTagController>(CourseTagController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
