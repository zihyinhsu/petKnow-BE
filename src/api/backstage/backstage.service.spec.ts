import { Test, TestingModule } from '@nestjs/testing';
import { BackstageService } from './backstage.service';

describe('BackstageService', () => {
  let service: BackstageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BackstageService],
    }).compile();

    service = module.get<BackstageService>(BackstageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
