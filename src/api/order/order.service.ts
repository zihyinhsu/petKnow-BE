import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartService } from 'src/api/cart/cart.service';
import { Repository } from 'typeorm';
import { Order } from './dto/order.entity';
import { orderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private repo: Repository<Order>,
    private cartsService: CartService,
  ) {}
  async create(orderData: orderDto, userId): Promise<Order> {
    orderData.userId = userId;
    orderData.createdAt = new Date();

    const cart = await this.cartsService.getCart(userId, null);

    if (!cart?.coursesId || cart?.coursesId.length === 0)
      throw new NotFoundException('購物車內沒有商品');

    orderData.cartData = cart;

    const order = this.repo.create(orderData);

    // 清空購物車
    if (cart) await this.cartsService.deleteCart(orderData.userId);

    return this.repo.save(order);
  }
  // 查詢自己的訂單
  async getOrder(userId) {
    const orderData = await this.repo.find({
      where: {
        userId,
      },
    });

    return orderData;
  }
}
