import { userDto } from './user.dto';
import { PickType } from '@nestjs/swagger'; // PartialType ：局部性套用

// 使用mapped-type 映射型別來重用DTO
export class updateUserDto extends PickType(userDto, ['name', 'introduction']) {}
