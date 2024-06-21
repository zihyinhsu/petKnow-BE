import { Test, TestingModule } from '@nestjs/testing';
import { FakeInformationController } from './fake-information.controller';

describe('FakeInformationController', () => {
  let controller: FakeInformationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FakeInformationController],
    }).compile();

    controller = module.get<FakeInformationController>(FakeInformationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
