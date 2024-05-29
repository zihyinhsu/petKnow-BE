import { Controller, Body, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@data/schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@ApiTags('註冊 & 登入')
@Controller('user2')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '註冊' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }
}
