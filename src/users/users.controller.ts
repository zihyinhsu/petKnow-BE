import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { userDto } from './dto/user.dto';
import { UsersService } from './users.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('註冊 & 登入')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor) // 使用內建攔截器
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}
  // 取得單一使用者資料
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('找不到該使用者資料');
    }
    return user;
  }
  // 註冊
  @Post('/signup')
  signUp(@Body() body: userDto) {
    return this.authService.signup(body);
  }

  // 登入
  @Post('/login')
  async login(@Body() body: LoginUserDto) {
    const user = await this.authService.login(body);
    let message = '登入失敗';
    let statusCode = 404;
    if (user) {
      message = '登入成功';
      statusCode = 200;
    }
    return {
      status: statusCode,
      message,
      user,
    };
  }
}
