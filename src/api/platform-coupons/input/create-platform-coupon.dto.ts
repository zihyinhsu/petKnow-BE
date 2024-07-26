import { IPlatformCoupon } from '@data/schema/platformCoupon.schema';
import { ApiProperty } from '@nestjs/swagger';
// import { IsArray, IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePlatformCouponDTO implements IPlatformCoupon {
  @ApiProperty({ description: '標籤名稱', example: ['貓咪食譜', '狗狗訓練'] })
  tagNames: string[];

  @ApiProperty({ description: '優惠卷代碼' })
  couponCode: string;

  @ApiProperty({ description: '優惠價格', example: 325 })
  price: number;

  @ApiProperty({ description: '是否啟用', example: true })
  isEnabled: boolean;

  @ApiProperty({ description: '起始日期', example: '2021-09-01' })
  startDate: Date;

  @ApiProperty({ description: '結束日期', example: '2021-09-30' })
  endDate: Date;
}
