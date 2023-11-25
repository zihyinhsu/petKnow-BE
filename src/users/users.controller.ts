import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { userDto } from './dto/user.dto';
import { UsersService } from './users.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { updateUserDto } from './dto/update-user.dto';
import { ResponseInterceptor } from 'src/interceptors/response/response.interceptor';
import { User } from './user.entity';

@ApiTags('註冊 & 登入')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor) // 使用內建攔截器
@UseInterceptors(new ResponseInterceptor(User)) // response 攔截器
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  // 取得當前使用者資料
  @ApiOperation({ summary: '取得當前使用者資料' })
  @Get('/personal')
  @UseGuards(AuthGuard('jwt')) //代表此 API 需要有權限才能打
  async findCurrentUser(@Req() req) {
    return req.user;
  }

  // 編輯當前使用者資料
  @ApiOperation({ summary: '編輯當前使用者資料' })
  @Patch('/personal')
  @UseGuards(AuthGuard('jwt')) //代表此 API 需要有權限才能打
  async editCurrentUser(@Body() body: updateUserDto, @Req() req) {
    return this.usersService.update(req.user._id, body);
  }

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
