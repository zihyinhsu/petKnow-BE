import { Test, TestingModule } from '@nestjs/testing';
import { FakeInformationService } from './fake-information.service';
import { DatabaseModule } from '@data/database.module';

describe('FakeInformationService', () => {
  let service: FakeInformationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [FakeInformationService],
    }).compile();

    service = module.get<FakeInformationService>(FakeInformationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
