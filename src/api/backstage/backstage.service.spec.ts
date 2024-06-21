import { Test, TestingModule } from '@nestjs/testing';
import { BackstageService } from './backstage.service';
import { DatabaseModule } from '@data/database.module';

describe('BackstageService', () => {
  let service: BackstageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [BackstageService],
    }).compile();

    service = module.get<BackstageService>(BackstageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
