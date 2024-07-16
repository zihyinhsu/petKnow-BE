import { Controller, Post, Req, UseGuards, Body } from '@nestjs/common';
import { GoldFlowService } from './gold-flow.service';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '@api/users/auth/role.guard';
import { GoldFlowCourseDto } from './input/gold-flow-course.dto';
import { ValidateUtilsService } from 'core/utils/validate-utils/validate-utils.service';

@Controller('gold-flow')
export class GoldFlowController {
  constructor(
    private readonly goldFlowService: GoldFlowService,
    private readonly validateUtilsService: ValidateUtilsService,
  ) {}

  //#region saveOrUpdateUserCartCourse [ 使用者 新增或更新購物車 - 課程資料 ]
  /** 使用者 新增或更新購物車 - 課程資料 */
  @Post()
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  async saveOrUpdateUserCartCourse(@Body() goldFlowCourseDto: GoldFlowCourseDto, @Req() req) {
    const courseId = goldFlowCourseDto.courseId;
    this.validateUtilsService.isObjectId(courseId);

    return await this.goldFlowService.saveOrUpdateUserCartCourseAsync(req.user._id, courseId);
  }
  //#endregion saveOrUpdateUserCartCourse [ 使用者 新增或更新購物車 - 課程資料 ]

  async deleteUserCartCourse() {}
}
