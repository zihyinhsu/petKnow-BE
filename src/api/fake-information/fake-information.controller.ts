import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { FakeInformationService } from './fake-information.service';
import { CreateCourseHierarchysDto } from './dto/create-course-hierarchys.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCouponManyDto } from './dto/create-coupon-many.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '@api/users/auth/role.guard';

// TODO: 使用者權限需測試

@ApiTags('產生假資料')
@Controller('fake-information')
export class FakeInformationController {
  constructor(private readonly fakeInformationService: FakeInformationService) {}

  //#region getUserCourseCountGreaterThanOne [ 讀取使用者開課數大於 1 ]
  /** 讀取使用者開課數大於 1 */
  @Get('/getUserCourseCountGreaterThanOne')
  @ApiOperation({ summary: '讀取使用者開課數大於 1' })
  @ApiResponse({ status: 200, description: '成功返回用户信息' })
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  async getUserCourseCountGreaterThanOne() {
    return await this.fakeInformationService.getUserCourseCountGreaterThanOneAsync();
  }
  //#endregion getUserCourseCountGreaterThanOne [ 讀取使用者開課數大於 1 ]

  //#region createCourseHierarchys [ 新增一筆課程彙總資料 ]
  /** 新增一筆課程彙總資料 */
  @ApiOperation({ summary: '新增一筆課程彙總資料' })
  @Post('/createCourseHierarchys')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  async createCourseHierarchys(
    @Body()
    createCourseHierarchysDto: CreateCourseHierarchysDto,
  ) {
    return await this.fakeInformationService.createCourseHierarchys(createCourseHierarchysDto);
  }
  //#endregion createCourseHierarchys [ 新增一筆課程彙總資料 ]

  //#region generateCourseHierarchysData [ 產生假資料 - 課程彙總資料 ]
  /** 產生假資料 - 課程彙總資料 */
  @ApiOperation({ summary: '產生假資料 - 課程彙總資料' })
  @Get('/generateCourseHierarchysData')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  async generateCourseHierarchysData() {
    return await this.fakeInformationService.courseHierarchyManyData();
  }
  //#endregion generateCourseHierarchysData [ 產生假資料 - 課程彙總資料 ]

  //#region generateCouponsData [ 產生假資料 - 平台優惠碼資料 ]
  /** 產生假資料 - 平台優惠碼資料 */
  @ApiOperation({ summary: '產生假資料 - 平台優惠碼資料' })
  @Post('/generateCouponsData')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  async generateCouponsData(@Body() createCouponManyDto: CreateCouponManyDto) {
    return await this.fakeInformationService.couponManyData(createCouponManyDto);
  }
  //#endregion generateCouponsData [ 產生假資料 - 平台優惠碼資料 ]

  //#region generateCourseTagData [ 產生假資料 - 標籤資料 ]
  /** 產生假資料 - 標籤資料 */
  @ApiOperation({ summary: '產生假資料 - 標籤資料' })
  @Get('/generateCourseTagData')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  async generateCourseTagData() {
    return await this.fakeInformationService.courseTagManyData();
  }
  //#endregion generateCourseTagData [ 產生假資料 - 標籤資料 ]

  //#region generateUserData [ 產生假資料 - 使用者資料 ]
  /** 產生假資料 - 使用者資料 */
  @ApiOperation({ summary: '產生假資料 - 使用者資料' })
  @Get('/generateUserData')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  async generateUserData() {
    return await this.fakeInformationService.userManyData();
  }
  //#endregion generateUserData [ 產生假資料 - 使用者資料 ]
}
