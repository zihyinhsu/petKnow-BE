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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoleGuard } from 'src/users/auth/role.guard';

@ApiTags('購物車')
@Controller('cart')
@UseGuards(AuthGuard('jwt'), RoleGuard)
export class CartController {
  constructor(private cartService: CartService) {}

  // 新增課程進購物車
  @ApiOperation({ summary: '新增課程進購物車' })
  @Post()
  async addToCart(@Query('courseId') courseId: string, @Req() req) {
    return this.cartService.addToCart(courseId, req.user._id);
  }

  // 取得特定帳號的購物車資料
  @ApiOperation({ summary: '取得特定帳號的購物車資料' })
  @Get()
  async getCart(@Req() req) {
    return this.cartService.getCart(req.user._id);
  }

  // 從購物車移除課程
  @ApiOperation({ summary: '從購物車移除課程' })
  @Delete('/:id')
  async removeFromCart(@Param('id') id: string, @Req() req) {
    return this.cartService.removeFromCart(id, req.user._id);
  }
}
