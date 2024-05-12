import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Cart } from 'src/cart/dto/cart.entity';
@Exclude()
export class orderDto {
  // @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  userId?: string;

  // @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @IsOptional()
  cartData?: Cart;
}
