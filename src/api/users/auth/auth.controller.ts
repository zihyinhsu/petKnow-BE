import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from '../dto/login-user.dto';
import { userDto } from '../dto/user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

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

  @ApiOperation({ summary: 'google OAuth 第三方登入' })
  @Get('/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req) {
    return this.authService.login(req.user);
  }
}
