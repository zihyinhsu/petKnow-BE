import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCouponManyDto {
  @ApiProperty({ example: 10 })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
