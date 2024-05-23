import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoleGuard } from 'src/api/users/auth/role.guard';
import { CouponService } from './coupon.service';
import { couponDto } from './dto/coupon.dto';
import { Coupon } from './dto/coupon.entity';

@ApiTags('優惠券')
@Controller('coupon')
@UseGuards(AuthGuard('jwt'), RoleGuard)
export class CouponController {
  constructor(private couponService: CouponService) {}

  // 新增優惠券
  @ApiOperation({ summary: '新增優惠券' })
  @Post()
  async addCoupon(
    @Body()
    couponData: couponDto,
  ) {
    return this.couponService.create(couponData);
  }

  // 使用優惠券
  @ApiOperation({ summary: '使用優惠券' })
  @HttpCode(200)
  @Post('/useCoupon')
  async useCoupon(@Query('code') couponCode: string, @Req() req) {
    return this.couponService.useCoupon(couponCode, req.user._id);
  }

  @ApiOperation({ summary: '取得優惠券資料' })
  @Get()
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  async findCreatedCourses(
    @Query('filter') filter: string,
    @Query('rowsPerPage') rowsPerPage: string,
    @Query('page') page: string,
    @Req() req,
  ): Promise<Coupon[]> {
    return this.couponService.find({
      filter,
      rowsPerPage,
      page,
      ownerId: req.user._id,
    });
  }

  // 更新單筆優惠券
  @ApiOperation({ summary: '更新單筆優惠券' })
  @Patch('/:id')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  update(@Param('id') id: string, @Body() body: couponDto) {
    return this.couponService.update(id, body);
  }
  // 刪除單筆優惠券
  @ApiOperation({ summary: '刪除單筆優惠券' })
  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  remove(@Param('id') id: string) {
    return this.couponService.remove(id);
  }
}
