import { Test, TestingModule } from '@nestjs/testing';
import { ValidateUtilsService } from './validate-utils.service';

describe('ValidateUtilsService', () => {
  let service: ValidateUtilsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValidateUtilsService],
    }).compile();

    service = module.get<ValidateUtilsService>(ValidateUtilsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
