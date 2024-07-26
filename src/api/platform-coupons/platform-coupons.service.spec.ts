import { Test, TestingModule } from '@nestjs/testing';
import { PlatformCouponsService } from './platform-coupons.service';

describe('PlatformCouponsService', () => {
  let service: PlatformCouponsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlatformCouponsService],
    }).compile();

    service = module.get<PlatformCouponsService>(PlatformCouponsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
