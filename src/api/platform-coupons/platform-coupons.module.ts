import { Module } from '@nestjs/common';
import { PlatformCouponsService } from './platform-coupons.service';
import { PlatformCouponsController } from './platform-coupons.controller';
import { DatabaseModule } from '@data/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [PlatformCouponsService],
  controllers: [PlatformCouponsController],
})
export class PlatformCouponsModule {}
