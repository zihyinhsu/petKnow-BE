import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Role } from '../auth/rbac';

export class userDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  @Expose()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @Expose()
  introduction: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @Expose()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsEnum(Role)
  @Expose()
  @IsOptional()
  role: Role;
}
