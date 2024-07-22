import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GoldFlowCouponDto {
  @ApiProperty({ description: '優惠卷代碼', example: '0' })
  @IsNotEmpty()
  @IsString()
  couponCode: string;
}
