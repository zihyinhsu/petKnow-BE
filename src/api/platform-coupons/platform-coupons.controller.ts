import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PlatformCouponsService } from './platform-coupons.service';
import { CreatePlatformCouponDTO } from './input/create-platform-coupon.dto';
import { ValidateObjectIdPipe } from 'core/pipes/validate.pipe';
import { UpdatePlatformCouponDTO } from './input/update-platform-coupon.dto';

@ApiTags('優惠資料表')
@Controller('platformCoupons')
export class PlatformCouponsController {
  constructor(private readonly platformCouponsService: PlatformCouponsService) {}

  @ApiOperation({
    summary: '優惠卷資料表 - 查詢所有資料',
    description: '根據傳入的名稱參數，查詢並傳回包含該名稱的優惠卷名稱。最多回傳100條結果。 ',
  })
  @Get()
  async getAll() {
    return this.platformCouponsService.getAll();
  }

  @ApiOperation({ summary: '優惠卷資料表 - 新增優惠卷' })
  @Post()
  async createPlatformCoupons(@Body() createDto: CreatePlatformCouponDTO) {
    console.log('createDto:', createDto);
    return await this.platformCouponsService.create(createDto);
  }

  @ApiOperation({ summary: '優惠卷資料表 - 查詢特定優惠卷' })
  @Get(':id')
  async getPlatformCouponsById(@Param('id', ValidateObjectIdPipe) id: string) {
    return this.platformCouponsService.findById(id);
  }

  @ApiOperation({ summary: '優惠卷資料表 - 更新優惠卷' })
  @Put(':id')
  async updatePlatformCoupons(
    @Param('id', ValidateObjectIdPipe) id: string,
    @Body() updateDto: UpdatePlatformCouponDTO,
  ) {
    return this.platformCouponsService.update(id, updateDto);
  }

  @ApiOperation({ summary: '優惠卷資料表 - 刪除優惠卷' })
  @Delete(':id')
  async deletePlatformCoupons(@Param('id', ValidateObjectIdPipe) id: string): Promise<boolean> {
    return this.platformCouponsService.delete(id);
  }
}
