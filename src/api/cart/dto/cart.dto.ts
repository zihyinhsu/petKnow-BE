import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class cartDto {
  @ApiProperty()
  @Expose()
  coursesId: string[];

  @ApiProperty()
  @IsNumber()
  @Expose()
  totalPrice: number;

  @ApiPropertyOptional()
  @IsNumber()
  @Expose()
  discountedPrice: number;
}
