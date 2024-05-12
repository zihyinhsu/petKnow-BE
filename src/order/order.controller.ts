import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoleGuard } from 'src/users/auth/role.guard';
import { orderDto } from './dto/order.dto';

@ApiTags('訂單')
@Controller('order')
@UseGuards(AuthGuard('jwt'), RoleGuard)
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  // 新增訂單
  @ApiOperation({ summary: '新增訂單' })
  @Post()
  async addOrder(
    @Body()
    orderData: orderDto,
    @Req() req,
  ) {
    return this.orderService.create(orderData, req.user._id);
  }

  // 查詢自己的訂單
  @ApiOperation({ summary: '查詢自己的訂單' })
  @Get()
  async getOrder(@Req() req) {
    return this.orderService.getOrder(req.user._id);
  }
}
