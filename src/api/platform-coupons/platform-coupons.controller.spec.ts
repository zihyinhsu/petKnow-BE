import { Test, TestingModule } from '@nestjs/testing';
import { PlatformCouponsController } from './platform-coupons.controller';

describe('PlatformCouponsController', () => {
  let controller: PlatformCouponsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlatformCouponsController],
    }).compile();

    controller = module.get<PlatformCouponsController>(PlatformCouponsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
