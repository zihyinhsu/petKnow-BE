import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { updateUserDto } from './dto/update-user.dto';
import { RoleGuard } from './auth/role.guard';

@ApiTags('使用者資料')
@Controller('user')
@UseGuards(AuthGuard('jwt'), RoleGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  // 取得當前使用者資料
  @ApiOperation({ summary: '取得當前使用者資料' })
  @Get('/personal')
  async findCurrentUser(@Req() req) {
    return req.user;
  }

  // 編輯當前使用者資料
  @ApiOperation({ summary: '編輯當前使用者資料' })
  @Patch('/personal')
  async editCurrentUser(@Body() body: updateUserDto, @Req() req) {
    return this.usersService.update(req.user._id, body);
  }
}
