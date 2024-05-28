import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { Order } from './dto/order.entity';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartModule } from '@api/cart/cart.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), OrderModule, CartModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
