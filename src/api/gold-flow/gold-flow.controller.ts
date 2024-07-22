import { Controller, Post, Req, UseGuards, Body, Delete, Get } from '@nestjs/common';
import { GoldFlowService } from './gold-flow.service';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '@api/users/auth/role.guard';
import { GoldFlowCourseDto } from './input/gold-flow-course.dto';
import { ValidateUtilsService } from 'core/utils/validate-utils/validate-utils.service';
import { HttpMessage } from '@config/enums/http.enum';
import { GoldFlowCouponDto } from './input/gold-flow-coupon.dto';
import { GoldFlowVisitorsCartDto } from './input/gold-flow-visitors-cart.dto';
import { GoldFlowCheckOrderDto } from './input/gold-flow-check-order.dto';
import { ApiOperation } from '@nestjs/swagger';

// TODO: 使用者權限需測試

@Controller('gold-flow')
export class GoldFlowController {
  constructor(
    private readonly goldFlowService: GoldFlowService,
    private readonly validateUtilsService: ValidateUtilsService,
  ) {}

  //#region saveOrUpdateUserCartCourse [ 使用者 新增或更新購物車 - 課程資料 ]
  /** 使用者 新增或更新購物車 - 課程資料 */
  @Post('/userCartCourse')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @ApiOperation({ summary: '使用者 新增或更新購物車 - 課程資料' })
  async saveOrUpdateUserCartCourse(@Body() goldFlowCourseDto: GoldFlowCourseDto, @Req() req) {
    const courseId = goldFlowCourseDto.courseId;
    this.validateUtilsService.isObjectId(courseId);

    return await this.goldFlowService.saveOrUpdateUserCartCourseAsync(req.user._id, courseId);
  }
  //#endregion saveOrUpdateUserCartCourse [ 使用者 新增或更新購物車 - 課程資料 ]

  //#region deleteUserCartCourse [ 使用者 移除購物車 - 課程資料 ]
  /** 使用者 移除購物車 - 課程資料 */
  @Delete('/userCartCourse')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @ApiOperation({ summary: '使用者 移除購物車 - 課程資料' })
  async deleteUserCartCourse(@Body() goldFlowCourseDto: GoldFlowCourseDto, @Req() req) {
    const courseId = goldFlowCourseDto.courseId;
    this.validateUtilsService.isObjectId(courseId);

    const result = await this.goldFlowService.deleteUserCartCourseAsync(req.user._id, courseId);

    if (result === 1) return '不存在於購物車';
    else if (result === false) return HttpMessage.DeleteFailure;

    return HttpMessage.DeleteSuccess;
  }
  //#endregion deleteUserCartCourse [ 使用者 移除購物車 - 課程資料 ]

  //#region saveOrUpdateUserCartCoupon [ 使用者 新增或更新購物車 - 優惠卷資料 ]
  /** 使用者 新增或更新購物車 - 優惠卷資料 */
  @Post('/userCartCoupon')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @ApiOperation({ summary: '使用者 新增或更新購物車 - 優惠卷資料' })
  async saveOrUpdateUserCartCoupon(@Body() goldFlowCouponDto: GoldFlowCouponDto, @Req() req) {
    const couponCode = goldFlowCouponDto.couponCode;

    const result = await this.goldFlowService.saveOrUpdateUserCartCouponAsync(
      req.user._id,
      couponCode,
    );

    if (result === 0) return '無此課程';
    else if (result === 1) return '優惠碼不存在或不符合條件';
    else if (result === false) return HttpMessage.CreateFailure;

    return HttpMessage.CreateSuccess;
  }
  //#endregion saveOrUpdateUserCartCoupon [ 使用者 新增或更新購物車 - 優惠卷資料 ]

  //#region deleteUserCartCoupon [ 使用者 移除購物車 - 優惠卷資料 ]
  /** 使用者 移除購物車 - 優惠卷資料 */
  @Delete('/userCartCoupon')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @ApiOperation({ summary: '使用者 移除購物車 - 優惠卷資料' })
  async deleteUserCartCoupon(@Req() req) {
    const result = await this.goldFlowService.deleteUserCartCouponAsync(req.user._id);

    if (result === false) return HttpMessage.DeleteFailure;

    return HttpMessage.DeleteSuccess;
  }
  //#endregion deleteUserCartCoupon [ 使用者 移除購物車 - 優惠卷資料 ]

  //#region getUserCart [ 使用者 讀取購物車資料 ]
  /** 使用者 讀取購物車資料 */
  @Get('/userCart')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @ApiOperation({ summary: '使用者 讀取購物車資料' })
  async getUserCart(@Req() req): Promise<any> {
    const currentDate = new Date();
    const shoppingCart = await this.goldFlowService.getUserCartAsync(req.user._id, currentDate);
    const youMightLike = await this.goldFlowService.getYouMightLike(currentDate);

    if (!shoppingCart)
      return {
        shoppingCart: [],
        youMightLike,
      };

    return {
      ...shoppingCart,
      youMightLike,
    };
  }
  //#endregion getUserCart [ 使用者 讀取購物車資料 ]

  //#region postVisitorsCart [ 訪客 讀取購物車資料 ]
  /** 訪客 讀取購物車資料 */
  @Post('/visitorsCart')
  @ApiOperation({ summary: '訪客 讀取購物車資料' })
  async postVisitorsCart(@Body() goldFlowVisitorsCartDto: GoldFlowVisitorsCartDto): Promise<any> {
    const { courseIds, couponCode } = goldFlowVisitorsCartDto;

    const currentDate = new Date();
    const youMightLike = await this.goldFlowService.getYouMightLike(currentDate);

    if (courseIds.length === 0)
      return {
        shoppingCart: [],
        youMightLike,
      };

    const courseHierarchy = await this.goldFlowService.getCartAsync(
      courseIds,
      couponCode,
      currentDate,
    );

    if (!courseHierarchy)
      return {
        shoppingCart: [],
        youMightLike,
      };

    return {
      ...courseHierarchy,
      youMightLike,
    };
  }
  //#endregion postVisitorsCart [ 訪客 讀取購物車資料 ]

  //#region getValidCoupon [ 讀取有效優惠卷 ]
  /** 讀取有效優惠卷 */
  @Get('/validCoupon')
  @ApiOperation({ summary: '讀取有效優惠卷' })
  async getValidCoupon() {
    const coupons = await this.goldFlowService.getValidCouponAsync();

    if (coupons.length === 0) return HttpMessage.RetrieveFailure;

    return coupons;
  }
  //#endregion getValidCoupon [ 讀取有效優惠卷 ]

  //#region createOrder [ 新增訂單 ]
  /** 新增訂單 */
  @Post('/createOrder')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @ApiOperation({ summary: '新增訂單' })
  async createOrder(@Req() req) {
    const result = await this.goldFlowService.orderProcessingAsync(
      req.user._id,
      req.user.name,
      req.user.email,
    );

    if (result === 0) return HttpMessage.BadRequest;
    else if (result === 1) return HttpMessage.CreateFailure;

    return result;
  }
  //#endregion createOrder [ 新增訂單 ]

  //#region postCheckOrder [ 讀取確認訂單資料 ]
  /** 讀取確認訂單資料 */
  @Post('/checkOrder')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @ApiOperation({ summary: '讀取確認訂單資料' })
  async postCheckOrder(@Body() goldFlowCheckOrderDto: GoldFlowCheckOrderDto, @Req() req) {
    const _id = goldFlowCheckOrderDto._id;

    const result = await this.goldFlowService.postCheckOrderAsync(req.user._id, _id);

    if (result === 0) return HttpMessage.BadRequest;
    else if (result === 1) return HttpMessage.RetrieveFailure;

    return result;
  }
  //#endregion postCheckOrder [ 讀取確認訂單資料 ]

  //#region postNotify [ 結帳完成 - 請求傳給後端 ]
  /** 結帳完成 - 請求傳給後端 */
  @Post('/notify')
  @ApiOperation({ summary: '結帳完成 - 請求傳給後端' })
  async postNotify(@Req() req) {
    const orderNotify = req.body;

    if (!Object.prototype.hasOwnProperty.call(req.body, 'TradeInfo'))
      return '付款失敗，請聯絡寵知客服人員';

    const result = await this.goldFlowService.postNotifyAsync(orderNotify);

    if (result === 0) return '找不到訂單';
    else if (result === 1) return '刪除購物車資料失敗';

    return '付款完成';
  }
  //#endregion postNotify [ 結帳完成 - 請求傳給後端 ]

  //#region postReturn [ 結帳完成 - 請求傳給前端 ]
  /** 結帳完成 - 請求傳給前端 */
  @Post('/return')
  @ApiOperation({ summary: '結帳完成 - 請求傳給前端' })
  async postReturn(@Req() req) {
    // TODO: 未完成
    console.log('----------Return Start----------');
    console.log('Return req.body:', req.body);
    console.log('----------Return End----------');

    return '完成';
  }
  //#endregion postReturn [ 結帳完成 - 請求傳給前端 ]
}
