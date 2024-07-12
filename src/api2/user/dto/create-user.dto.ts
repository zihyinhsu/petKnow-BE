import {
  IsString,
  IsEmail,
  IsArray,
  IsEnum,
  MaxLength,
  // IsBoolean,
  IsOptional,
  // IsDate,
  MinLength,
} from 'class-validator';
// import { Type } from 'class-transformer';
import { Role } from '@data/enum/role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ enum: [Role.STUDENT], isArray: true })
  @IsArray()
  @IsEnum(Role, { each: true })
  role: Role[];

  @ApiProperty()
  @IsString()
  @MaxLength(50)
  @MinLength(3)
  name: string;

  @ApiProperty({ required: false }) // 添加 ApiProperty 装饰器，标记为可选
  @IsOptional()
  @IsString()
  @MaxLength(255)
  mugShot?: string;

  @ApiProperty()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  password: string;

  @ApiProperty({ required: false }) // 添加 ApiProperty 装饰器，标记为可选
  @IsOptional()
  @IsString()
  @MaxLength(5000)
  lecturerBio?: string;

  // @ApiProperty({ required: false })
  // @IsBoolean()
  // isFrozen: boolean;

  // @ApiProperty({ required: false })
  // @IsBoolean()
  // isNotificationEnabled: boolean;

  // @ApiProperty({ required: false })
  // @IsBoolean()
  // isPrivacyEnabled: boolean;

  // @IsOptional()
  // @IsDate()
  // @Type(() => Date)
  // createdAt?: Date;

  // @IsOptional()
  // @IsDate()
  // @Type(() => Date)
  // updatedAt?: Date;

  // @IsOptional()
  // @IsDate()
  // @Type(() => Date)
  // lastLoginTime?: Date;
}
