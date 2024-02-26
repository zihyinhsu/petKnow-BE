import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from '../dto/login-user.dto';
import { userDto } from '../dto/user.dto';
import { AuthService } from './auth.service';
@ApiTags('註冊 & 登入')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  // 註冊
  @ApiOperation({ summary: '註冊' })
  @Post('/signup')
  signUp(@Body() body: userDto) {
    return this.authService.signup(body);
  }

  // 登入
  @ApiOperation({ summary: '登入' })
  @Post('/login')
  async login(@Body() body: LoginUserDto) {
    return this.authService.login(body);
  }
}
