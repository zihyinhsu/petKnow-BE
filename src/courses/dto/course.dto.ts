import { Expose } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class courseDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  @Expose()
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  @Expose()
  shortDescription: string;

  @IsString()
  @IsOptional()
  cover: string; //之後要看怎麼存圖片

  @IsString()
  @IsNotEmpty()
  level: string;

  @IsNumber()
  @IsOptional()
  time: number;

  @IsNumber()
  @IsOptional()
  total: number;

  @IsString()
  @IsNotEmpty()
  instructorName: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsOptional()
  discountPrice: number;

  @IsBoolean()
  @IsOptional()
  isFree: boolean;
}
