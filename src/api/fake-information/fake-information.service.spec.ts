import { Test, TestingModule } from '@nestjs/testing';
import { FakeInformationService } from './fake-information.service';

describe('FakeInformationService', () => {
  let service: FakeInformationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FakeInformationService],
    }).compile();

    service = module.get<FakeInformationService>(FakeInformationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
