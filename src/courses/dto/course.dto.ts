import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    minLength: 3,
    maxLength: 20,
    description: '課程名稱',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  @Expose()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  @Expose()
  shortDescription: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  cover: string; //之後要看怎麼存圖片

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  level: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  time: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  total: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  instructorName: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  discountPrice: number;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isFree: boolean;
}
