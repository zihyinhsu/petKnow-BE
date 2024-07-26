import { IPlatformCoupon } from '@data/schema/platformCoupon.schema';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdatePlatformCouponDTO implements IPlatformCoupon {
  @ApiProperty({ description: '標籤名稱', example: ['貓咪食譜', '狗狗訓練'] })
  @IsString()
  tagNames: string[];

  @ApiProperty({ description: '優惠卷代碼' })
  @IsNotEmpty()
  @IsString()
  couponCode: string;

  @ApiProperty({ description: '優惠價格', example: 325 })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ description: '是否啟用', example: true })
  @IsBoolean()
  isEnabled: boolean;

  @ApiProperty({ description: '起始日期', example: '2021-09-01' })
  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @ApiProperty({ description: '結束日期', example: '2021-09-30' })
  @IsNotEmpty()
  @IsDate()
  endDate: Date;
}
