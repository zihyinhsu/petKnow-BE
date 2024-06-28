import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { BackstageService } from './backstage.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation } from '@nestjs/swagger';
import { RoleGuard } from '@api/users/auth/role.guard';

@Controller('backstage')
export class BackstageController {
  constructor(private readonly backstageService: BackstageService) {}

  // TODO: 使用者權限需測試
  @ApiOperation({ summary: '使用者 後台 - 我的課堂' })
  @Get('myClassroom')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  async getMyClassroom(@Req() req) {
    return await this.backstageService.getMyClassroomAsync(req.user._id);
  }
}
