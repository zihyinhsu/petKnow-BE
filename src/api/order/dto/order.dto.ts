import { Exclude } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Cart } from 'src/api/cart/dto/cart.entity';
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
