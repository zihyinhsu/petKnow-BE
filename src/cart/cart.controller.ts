import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation } from '@nestjs/swagger';
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  // 新增課程進購物車
  @ApiOperation({ summary: '新增課程進購物車' })
  @Post()
  @UseGuards(AuthGuard('jwt')) //代表此 API 需要有權限才能打
  async addToCart(@Query('courseId') courseId: string, @Req() req) {
    return this.cartService.addToCart(courseId, req.user._id);
  }

  // 取得特定帳號的購物車資料
  @ApiOperation({ summary: '取得特定帳號的購物車資料' })
  @Get()
  @UseGuards(AuthGuard('jwt')) //代表此 API 需要有權限才能打
  async getCart(@Req() req) {
    return this.cartService.getCart(req.user._id);
  }

  // 從購物車移除課程
  @ApiOperation({ summary: '從購物車移除課程' })
  @Delete('/:id')
  @UseGuards(AuthGuard('jwt')) //代表此 API 需要有權限才能打
  async removeFromCart(@Param('id') id: string, @Req() req) {
    return this.cartService.removeFromCart(id, req.user._id);
  }
}
