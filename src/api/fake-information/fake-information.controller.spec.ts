import { Test, TestingModule } from '@nestjs/testing';
import { FakeInformationController } from './fake-information.controller';
import { DatabaseModule } from '@data/database.module';
import { FakeInformationService } from './fake-information.service';

describe('FakeInformationController', () => {
  let controller: FakeInformationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [FakeInformationController],
      providers: [FakeInformationService],
    }).compile();

    controller = module.get<FakeInformationController>(FakeInformationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
