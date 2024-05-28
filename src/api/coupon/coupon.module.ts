import { Module } from '@nestjs/common';
import { CouponController } from './coupon.controller';
import { CouponService } from './coupon.service';
import { Coupon } from './dto/coupon.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartModule } from '@api/cart/cart.module';

@Module({
  imports: [TypeOrmModule.forFeature([Coupon]), CouponModule, CartModule],
  controllers: [CouponController],
  providers: [CouponService],
})
export class CouponModule {}
