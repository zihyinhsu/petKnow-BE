import { userDto } from './user.dto';
import { PartialType } from '@nestjs/swagger'; // PartialType ：局部性套用

// 使用mapped-type 映射型別來重用DTO
export class CreateUserDto extends PartialType(userDto) {}
