import { Controller, Body, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@data/schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('註冊 & 登入')
@Controller('user2')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '註冊' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.signup(createUserDto);
  }

  // 登入
  @ApiOperation({ summary: '登入' })
  @Post('/login')
  async login(@Body() body: LoginUserDto) {
    return this.userService.login(body);
  }
}
