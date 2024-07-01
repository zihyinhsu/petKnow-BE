import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCouponManyDto {
  @ApiProperty({ example: 30 })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
