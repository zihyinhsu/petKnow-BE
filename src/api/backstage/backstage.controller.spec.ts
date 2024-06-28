import { Test, TestingModule } from '@nestjs/testing';
import { BackstageController } from './backstage.controller';

describe('BackstageController', () => {
  let controller: BackstageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BackstageController],
    }).compile();

    controller = module.get<BackstageController>(BackstageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
