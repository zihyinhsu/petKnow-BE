import { CourseHierarchy } from '@data/schema/courseHierarchy.schema';
import { PlatformCoupon } from '@data/schema/platformCoupon.schema';
import { ShoppingCart } from '@data/schema/shoppingCart.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto';
import {
  IGetCart,
  ICheckCartCoursesReturn,
  ICheckCourse as ICheckCartCouponParameter,
  ICheckCourse as ICheckCourseResult,
  ICheckCourse as ICheckCourseParameter,
  IOrderParams,
  ICreateOrderParams,
} from './types/goldFlow.type';
import { EnvService } from '@config/env/env.service';
import { LevelEnum } from '@data/enum/level.enum';
import { Order } from '@data/schema/order.schema';
import { OrderDetail } from '@data/schema/orderDetails.schema';

@Injectable()
export class GoldFlowService {
  private readonly coverUrl;
  private readonly coverParamsUrl;
  private readonly merchantId;
  private readonly version;
  private readonly respondType;
  private readonly goldFlowHashKey;
  private readonly goldFlowHashIv;
  private readonly goldFlowAlgorithm;
  private readonly orderSalt;
  private readonly orderHashKey;
  private readonly orderHashIv;
  private readonly orderAlgorithm;

  constructor(
    @InjectModel(CourseHierarchy.name)
    private readonly courseHierarchyModel: Model<CourseHierarchy>,
    @InjectModel(ShoppingCart.name)
    private readonly shoppingCartModel: Model<ShoppingCart>,
    @InjectModel(PlatformCoupon.name)
    private readonly platformCouponModel: Model<PlatformCoupon>,
    @InjectModel(Order.name)
    private readonly orderModel: Model<Order>,
    @InjectModel(OrderDetail.name)
    private readonly orderDetailModel: Model<OrderDetail>,
    private readonly envService: EnvService,
  ) {
    this.coverUrl = this.envService.getCoverUrl();
    this.coverParamsUrl = this.envService.getCoverParamsUrl();
    this.merchantId = this.envService.getMerchantId();
    this.respondType = this.envService.getRespondType();
    this.version = this.envService.getVersion();

    this.goldFlowHashKey = this.envService.getGoldFlowHashKey();
    this.goldFlowHashIv = this.envService.getGoldFlowHashIv();
    this.goldFlowAlgorithm = this.envService.getGoldFlowAlgorithm();

    this.orderSalt = this.envService.getOrderSalt();
    this.orderHashKey = this.envService.getOrderHashKey();
    this.orderHashIv = this.envService.getOrderHashIv();
    this.orderAlgorithm = this.envService.getOrderAlgorithm();
  }

  //#region saveOrUpdateUserCartCourseAsync [ 使用者 新增或更新購物車 - 課程資料 ]
  /** 使用者 新增或更新購物車 - 課程資料 */
  async saveOrUpdateUserCartCourseAsync(userId: Types.ObjectId, courseId: string) {
    const courseHierarchy = await this.courseHierarchyModel.findOne({
      _id: courseId,
      isPublished: true, // 判斷已上架
    });

    if (!courseHierarchy) return 0;

    const shoppingCart = await this.shoppingCartModel.findOne({ user: userId });

    if (!shoppingCart) {
      const courseIds = [courseId];
      const result = await this.shoppingCartModel.create({ user: userId, courseIds: courseIds });

      return result ? result : false;
    }

    const courseIds = shoppingCart.courseIds;

    if (courseIds.includes(courseId)) return 1;

    courseIds.push(courseId);

    const result = await this.shoppingCartModel.findOneAndUpdate(
      {
        user: userId,
      },
      {
        $set: { courseIds: courseIds, updatedAt: new Date() }, // 更新部分欄位
      },
      {
        new: true, // 回傳更新的文檔
      },
    );

    return result;
  }
  //#endregion saveOrUpdateUserCartCourseAsync [ 使用者 新增或更新購物車 - 課程資料 ]

  //#region deleteUserCartCourseAsync [ 使用者 移除購物車 - 課程資料 ]
  /** 使用者 移除購物車 - 課程資料 */
  async deleteUserCartCourseAsync(userId: Types.ObjectId, courseId: string) {
    const shoppingCart = await this.shoppingCartModel.findOne({ user: userId });

    if (!shoppingCart) {
      return false;
    }

    const courseIds = shoppingCart.courseIds;

    if (!courseIds.includes(courseId)) return 1;

    const newCourseIds = courseIds.filter(item => item !== courseId);

    const result = await this.shoppingCartModel.findOneAndUpdate(
      {
        user: userId,
      },
      {
        $set: { courseIds: newCourseIds, updatedAt: new Date() }, // 更新部分欄位
      },
      {
        new: true, // 回傳更新的文檔
      },
    );

    return result;
  }
  //#endregion deleteUserCartCourseAsync [ 使用者 移除購物車 - 課程資料 ]

  //#region saveOrUpdateUserCartCouponAsync [ 使用者 新增或更新購物車 - 優惠卷資料 ]
  /** 使用者 新增或更新購物車 - 優惠卷資料 */
  async saveOrUpdateUserCartCouponAsync(userId: Types.ObjectId, couponCode: string) {
    const currentDate = new Date();

    const shoppingCartCourseIds = await this.shoppingCartModel.findOne(
      { user: userId },
      { courseIds: 1 },
    );

    if (!shoppingCartCourseIds) return 1;

    const courseIds = shoppingCartCourseIds.courseIds;
    const courseHierarchy = await this.courseHierarchyModel
      .find({
        _id: { $in: courseIds.map(id => new Types.ObjectId(id)) },
        isPublished: true,
      })
      .distinct('tagNames');

    if (!courseHierarchy) return 0;

    const platformCoupons = await this.platformCouponModel.findOne({
      $and: [
        { couponCode: couponCode },
        { tagNames: { $in: courseHierarchy } },
        { isEnabled: true },
        { startDate: { $lte: currentDate } }, // 判斷開始時間小於等於當前時間
        { endDate: { $gte: currentDate } }, // 判斷結束時間大於等於當前時間
      ],
    });

    if (!platformCoupons) return 1;

    const shoppingCart = await this.shoppingCartModel.findOne({ user: userId });

    if (!shoppingCart) {
      const result = await this.shoppingCartModel.create({ user: userId, couponCode: couponCode });

      return result ? result : false;
    }

    const result = await this.shoppingCartModel.findOneAndUpdate(
      {
        user: userId,
      },
      {
        $set: { couponCode: couponCode, updatedAt: new Date() }, // 更新部分欄位
      },
      {
        new: true, // 回傳更新的文檔
      },
    );

    return result;
  }
  //#endregion saveOrUpdateUserCartCouponAsync [ 使用者 新增或更新購物車 - 優惠卷資料 ]

  //#region deleteUserCartCouponAsync [ 使用者 移除購物車 - 優惠卷資料 ]
  /** 使用者 移除購物車 - 優惠卷資料 */
  async deleteUserCartCouponAsync(userId: Types.ObjectId) {
    const shoppingCart = await this.shoppingCartModel.findOne({ user: userId });

    if (!shoppingCart) {
      return false;
    }

    const result = await this.shoppingCartModel.findOneAndUpdate(
      {
        user: userId,
      },
      {
        $set: { couponCode: '', updatedAt: new Date() }, // 更新部分欄位
      },
      {
        new: true, // 回傳更新的文檔
      },
    );

    return result;
  }
  //#endregion deleteUserCartCouponAsync [ 使用者 移除購物車 - 優惠卷資料 ]

  //#region getUserCartAsync [ 使用者 讀取購物車資料 ]
  /** 使用者 讀取購物車資料 */
  async getUserCartAsync(_id: Types.ObjectId, currentDate: Date) {
    const shoppingCart = await this.getUserCartCourseIdsAsync(_id);

    if (!shoppingCart) return false;

    const { courseIds, couponCode } = shoppingCart;

    return await this.getCartAsync(courseIds, couponCode, currentDate);
  }
  //#endregion getUserCartAsync [ 使用者 讀取購物車資料 ]

  //#region getCartAsync [ 讀取購物車資料 ]
  /** 讀取購物車資料 */
  async getCartAsync(courseIds: string[], couponCode: string, currentDate: Date) {
    const courseHierarchy = await this.getCartCoursesAsync(courseIds, currentDate);

    if (!courseHierarchy) return false;

    const result = await this.getCartCouponAsync(courseHierarchy, couponCode, currentDate);

    return result;
  }
  //#endregion getCartAsync [ 讀取購物車資料 ]

  //#region [ 共用邏輯 ]
  //#region getCartCoursesAsync [ 讀取購物車 - 課程資料 ]
  /** 讀取購物車 - 課程資料 */
  async getCartCoursesAsync(courseIds: string[], currentDate: Date) {
    const [courseHierarchy] = await this.courseHierarchyModel.aggregate<ICheckCourseResult>([
      {
        $match: {
          $and: [
            { _id: { $in: courseIds.map(id => new Types.ObjectId(id)) } },
            { isPublished: true }, // 判斷已上架
          ],
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $group: {
          _id: null,
          totalPrice: {
            $sum: {
              $cond: [
                {
                  $eq: ['$isFree', true], // 判斷免費課程
                },
                0,
                {
                  $cond: [
                    {
                      $and: [
                        { $ifNull: ['$discountDate', false] }, // 判斷特價日期不為空
                        { $gte: ['$discountDate', currentDate] }, // 判斷特價日期大於等於今天
                      ],
                    },
                    '$discountPrice',
                    '$price',
                  ],
                },
              ],
            },
          },
          shoppingCart: {
            $push: {
              _id: '$_id',
              title: '$title',
              cover: { $concat: [this.coverUrl, '$cover', this.coverParamsUrl] },
              tagNames: '$tagNames',
              level: {
                $switch: {
                  branches: Object.entries(LevelEnum).map(([level, levelName]) => ({
                    case: { $eq: ['$level', parseInt(level)] },
                    then: levelName,
                  })),
                  default: null,
                },
              },
              time: '$totalTime',
              total: '$totalNumber',
              instructorName: { $arrayElemAt: ['$user.name', 0] },
              price: '$price',
              discountPrice: {
                $cond: [
                  {
                    $and: [
                      { $ifNull: ['$discountDate', false] }, // 判斷特價日期不為空
                      { $gte: ['$discountDate', currentDate] }, // 判斷特價日期大於等於今天
                    ],
                  },
                  '$discountPrice',
                  null,
                ],
              },
              isFree: '$isFree',
            },
          },
          uniqueTagNames: { $addToSet: '$tagNames' },
          courseIds: { $push: { $toString: '$_id' } },
        },
      },
      {
        $project: {
          _id: 0, // 排除 _id 欄位
        },
      },
    ]);

    if (courseHierarchy?.uniqueTagNames) {
      courseHierarchy.uniqueTagNames = [
        ...new Set(courseHierarchy.shoppingCart.flatMap(item => item.tagNames)),
      ];
    }

    return courseHierarchy;
  }
  //#endregion getCartCoursesAsync [ 讀取購物車 - 課程資料 ]

  //#region getCartCouponAsync [ 讀取購物車 - 優惠卷資料 ]
  /** 讀取購物車 - 優惠卷資料 */
  async getCartCouponAsync(
    courseHierarchy: ICheckCartCouponParameter,
    couponCode: string,
    currentDate: Date,
  ): Promise<ICheckCartCoursesReturn> {
    const [platformCoupons] = await this.platformCouponModel.aggregate([
      {
        $match: {
          $and: [
            { couponCode: couponCode },
            { tagNames: { $in: courseHierarchy.uniqueTagNames } },
            { isEnabled: true },
            { startDate: { $lte: currentDate } }, // 判斷開始時間小於等於當前時間
            { endDate: { $gte: currentDate } }, // 判斷結束時間大於等於當前時間
          ],
        },
      },
      {
        $project: {
          _id: 0,
          couponCode: '$couponCode',
          couponPrice: '$price',
        },
      },
      {
        $limit: 1,
      },
    ]);

    delete courseHierarchy.uniqueTagNames;

    if (!platformCoupons) return { ...courseHierarchy };

    courseHierarchy.discountedPrice = courseHierarchy.totalPrice - platformCoupons.couponPrice;

    return { ...courseHierarchy, ...platformCoupons };
  }
  //#endregion getCartCouponAsync [ 讀取購物車 - 優惠卷資料 ]

  //#region getYouMightLike [ 讀取購物車 - 推薦課程 ]
  /** 讀取購物車 - 推薦課程 */
  async getYouMightLike(currentDate: Date) {
    const youMightLike = await this.courseHierarchyModel.aggregate([
      {
        $match: {
          $and: [
            { isPublished: true, isPopular: true }, // 判斷已 上架 且 為熱門課程
          ],
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $sample: { size: 10 }, // 隨機讀取10筆
      },
      {
        $project: {
          _id: '$_id',
          title: '$title',
          cover: { $concat: [this.coverUrl, '$cover', this.coverParamsUrl] },
          level: {
            $switch: {
              branches: Object.entries(LevelEnum).map(([level, levelName]) => ({
                case: { $eq: ['$level', parseInt(level)] },
                then: levelName,
              })),
              default: null,
            },
          },
          time: '$totalTime',
          total: '$totalNumber',
          instructorName: { $arrayElemAt: ['$user.name', 0] },
          price: '$price',
          discountPrice: {
            $cond: [
              {
                $and: [
                  { $ifNull: ['$discountDate', false] }, // 判斷特價日期不為空
                  { $gte: ['$discountDate', currentDate] }, // 判斷特價日期大於等於今天
                ],
              },
              '$discountPrice',
              null,
            ],
          },
          isFree: '$isFree',
        },
      },
    ]);

    return youMightLike;
  }
  //#endregion getYouMightLike [ 讀取購物車 - 推薦課程 ]

  //#region getUserCartCourseIdsAsync [ 使用者 讀取購物車 - 課程 id ]
  /** 使用者 讀取購物車 - 課程 id */
  async getUserCartCourseIdsAsync(_id: Types.ObjectId) {
    const shoppingCart = await this.shoppingCartModel.findOne<IGetCart>(
      { user: _id },
      {
        courseIds: 1,
        couponCode: 1,
      },
    );

    return shoppingCart;
  }
  //#endregion getUserCartCourseIdsAsync [ 使用者 讀取購物車 - 課程 id ]
  //#endregion [ 共用邏輯 ]

  //#region getValidCouponAsync [ 讀取有效優惠卷 ]
  /** 讀取有效優惠卷 */
  async getValidCouponAsync() {
    const currentDate = new Date();

    const platformCoupons = await this.platformCouponModel.find(
      {
        isEnabled: true,
        startDate: { $lte: currentDate },
        endDate: { $gte: currentDate },
      },
      {
        _id: 0,
        tagNames: 1,
        couponCode: 1,
        price: 1,
        startDate: 1,
        endDate: 1,
      },
    );

    return platformCoupons;
  }
  //#endregion getValidCouponAsync [ 讀取有效優惠卷 ]

  //#region orderProcessingAsync [ 訂單處理 ]
  /** 訂單處理 */
  async orderProcessingAsync(userId: Types.ObjectId, userName: string, email: string) {
    const shoppingCart = await this.getUserCartCourseIdsAsync(userId);

    if (!shoppingCart) return 0;

    const currentDate = new Date();
    const { courseIds, couponCode } = shoppingCart;

    const courseHierarchy = await this.checkOrderCoursesAsync(courseIds, currentDate);
    const shoppingCartCount = courseHierarchy.shoppingCart.length;

    if (!courseHierarchy || shoppingCartCount === 0) return 0;

    const itemDesc = `${shoppingCartCount}`;

    const uuid = uuidv4();
    const withoutHyphens = uuid.replace(/-/g, '');
    const shortenedUUID = withoutHyphens.substring(0, 20);
    const timeStamp = Math.round(currentDate.getTime() / 1000);
    const orderId = `${shortenedUUID}${timeStamp}`;
    const neweBpay: IOrderParams = {
      amt: -1,
      email: email,
      merchantOrderNo: orderId,
      timeStamp: timeStamp,
      itemDesc: itemDesc,
    };

    const order: ICreateOrderParams = {
      user: userId,
      userName: userName,
      merchantOrderNo: orderId,
      merchantID: this.merchantId,
      version: this.version,
      itemDesc: itemDesc,
      email: email,
      timeStamp: timeStamp,
      createdAt: currentDate,
      updatedAt: currentDate,
    };

    if (!couponCode) {
      delete courseHierarchy.uniqueTagNames;
      delete courseHierarchy.courseIds;
      delete courseHierarchy.courseIdsStr;

      neweBpay.amt = courseHierarchy.totalPrice;
      order.amt = courseHierarchy.totalPrice;

      const newOrder = await this.createOrderAsync(neweBpay, order, courseHierarchy);

      return newOrder;
    }

    const [platformCoupons] = await this.platformCouponModel.aggregate([
      {
        $match: {
          $and: [
            { couponCode: couponCode },
            { tagNames: { $in: courseHierarchy.uniqueTagNames } },
            { isEnabled: true },
            { startDate: { $lte: currentDate } }, // 判斷開始時間小於等於當前時間
            { endDate: { $gte: currentDate } }, // 判斷結束時間大於等於當前時間
          ],
        },
      },
      {
        $project: {
          _id: 0,
          couponPrice: '$price',
        },
      },
      {
        $limit: 1,
      },
    ]);

    delete courseHierarchy.uniqueTagNames;
    delete courseHierarchy.courseIds;
    delete courseHierarchy.courseIdsStr;

    if (!platformCoupons.couponPrice) {
      neweBpay.amt = courseHierarchy.totalPrice;
      order.amt = courseHierarchy.totalPrice;

      const newOrder = await this.createOrderAsync(neweBpay, order, courseHierarchy);

      return newOrder;
    }

    courseHierarchy.discountedPrice = courseHierarchy.totalPrice - platformCoupons.couponPrice;

    const amt = courseHierarchy.discountedPrice;

    neweBpay.amt = amt;
    order.amt = amt;
    order.couponPrice = platformCoupons.couponPrice;

    const newOrder = await this.createOrderAsync(neweBpay, order, courseHierarchy);

    return newOrder;
  }
  //#endregion orderProcessingAsync [ 訂單處理 ]

  //#region checkOrderCoursesAsync [ 確認訂單課程 ]
  /** 確認訂單課程 */
  async checkOrderCoursesAsync(courseIds: string[], currentDate: Date) {
    const [courseHierarchy] = await this.courseHierarchyModel.aggregate<ICheckCourseResult>([
      {
        $match: {
          $and: [
            { _id: { $in: courseIds.map(id => new Types.ObjectId(id)) } },
            { isPublished: true }, // 判斷已上架
          ],
        },
      },
      {
        $unwind: '$tagNames', // 展开 uniqueTagNames 字段
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $group: {
          _id: null,
          totalPrice: {
            $sum: {
              $cond: [
                {
                  $eq: ['$isFree', true], // 判斷免費課程
                },
                0,
                {
                  $cond: [
                    {
                      $and: [
                        { $ifNull: ['$discountDate', false] }, // 判斷特價日期不為空
                        { $gte: ['$discountDate', currentDate] }, // 判斷特價日期大於等於今天
                      ],
                    },
                    '$discountPrice',
                    '$price',
                  ],
                },
              ],
            },
          },
          shoppingCart: {
            $push: {
              _id: '$_id',
              title: '$title',
              total: '$totalNumber',
              price: '$price',
              discountPrice: {
                $cond: [
                  {
                    $and: [
                      { $ifNull: ['$discountDate', false] }, // 判斷特價日期不為空
                      { $gte: ['$discountDate', currentDate] }, // 判斷特價日期大於等於今天
                    ],
                  },
                  '$discountPrice',
                  null,
                ],
              },
              isFree: '$isFree',
            },
          },
          uniqueTagNames: { $addToSet: '$tagNames' },
          courseIds: { $push: { $toString: '$_id' } },
        },
      },
      {
        $project: {
          _id: 0, // 排除 _id 欄位
          totalPrice: 1,
          shoppingCart: 1,
          uniqueTagNames: 1,
          courseIds: 1,
          courseIdsStr: {
            $reduce: {
              input: '$courseIds',
              initialValue: '',
              in: {
                $concat: ['$$value', { $cond: [{ $eq: ['$$value', ''] }, '', ','] }, '$$this'],
              },
            },
          },
        },
      },
    ]);

    return courseHierarchy;
  }
  //#endregion checkOrderCoursesAsync [ 確認訂單課程 ]

  //#region createOrderAsync [ 新增訂單 ]
  /** 新增訂單 */
  async createOrderAsync(
    neweBpay: IOrderParams,
    order: ICreateOrderParams,
    courseHierarchy: ICheckCourseParameter,
  ) {
    const aesEncrypted = this.createMpgAesEncrypt(
      neweBpay,
      this.goldFlowHashKey,
      this.goldFlowHashIv,
      this.goldFlowAlgorithm,
    );

    const shaEncrypted = this.createMpgShaEncrypt(
      aesEncrypted,
      this.goldFlowHashKey,
      this.goldFlowHashIv,
    );

    order.tradeInfo = aesEncrypted;
    order.tradeSha = shaEncrypted;

    if (!aesEncrypted || !shaEncrypted) return 0;

    const newOrder = await this.orderModel.create(order);
    const _id = newOrder._id as Types.ObjectId;

    if (!_id) return 1;

    const newOrderDetails = await this.createOrderDetailsAsync(_id, courseHierarchy);

    if (!newOrderDetails) return 1;

    const _idEncrypt = this.orderIdAesEncrypt(
      _id.toString(),
      this.orderHashKey,
      this.orderHashIv,
      this.orderSalt,
      this.orderAlgorithm,
    );

    return {
      _id: _idEncrypt,
      ...courseHierarchy,
    };
  }
  //#endregion createOrderAsync [ 新增訂單 ]

  //#region createOrderDetailsAsync [ 新增訂單明細 ]
  /** 新增訂單明細 */
  async createOrderDetailsAsync(_id: Types.ObjectId, courseHierarchy: ICheckCourseParameter) {
    const orderDetails = courseHierarchy.shoppingCart.map(obj => {
      return {
        order: _id,
        course: obj._id,
        title: obj.title,
        price: obj.price,
        discountPrice: obj.discountPrice,
        isFree: obj.isFree,
      };
    });

    const newOrderDetails = await this.orderDetailModel.insertMany(orderDetails);

    return newOrderDetails;
  }
  //#endregion createOrderDetailsAsync [ 新增訂單明細 ]

  //#region postCheckOrderAsync [ 確認訂單資料 ]
  /** 確認訂單資料 */
  async postCheckOrderAsync(userId: Types.ObjectId, orderId: string) {
    const _id = this.orderIdAesDecrypt(
      orderId,
      this.orderHashKey,
      this.orderHashIv,
      this.orderSalt,
      this.orderAlgorithm,
    );

    const isValidId = isValidObjectId(_id);

    if (!isValidId) return 0;

    const order = await this.orderModel.findOne(
      { _id: _id, user: userId },
      {
        _id: 1,
        userName: 1,
        merchantID: 1,
        tradeSha: 1,
        tradeInfo: 1,
        timeStamp: 1,
        version: 1,
        merchantOrderNo: 1,
        amt: 1,
        itemDesc: 1,
        email: 1,
      },
    );

    if (!order) return 1;

    return order;
  }
  //#endregion postCheckOrderAsync [ 確認訂單資料 ]

  //#region orderIdAesEncrypt [ 訂單ID 加密 ]
  /** 訂單ID 加密 */
  orderIdAesEncrypt(
    data: string,
    useKey: string,
    useIv: string,
    salt: string,
    algorithm: string = 'aes-256-cbc',
  ): string {
    const key = crypto.scryptSync(useKey, salt, 32); // 密钥
    const iv = Buffer.from(useIv, 'hex'); // 初始化向量
    const cipher = crypto.createCipheriv(algorithm, key, iv);

    let encrypted = cipher.update(data, 'utf8', 'hex');

    return encrypted + cipher.final('hex');
  }
  //#endregion orderIdAesEncrypt [ 訂單ID 加密 ]

  //#region orderIdAesDecrypt [ 訂單ID 解密 ]
  /** 訂單ID 解密 */
  orderIdAesDecrypt(
    encryptedData: string,
    useKey: string,
    useIv: string,
    salt: string,
    algorithm: string = 'aes-256-cbc',
  ): string {
    const key = crypto.scryptSync(useKey, salt, 32); // 密钥
    const iv = Buffer.from(useIv, 'hex');
    const decipher = crypto.createDecipheriv(algorithm, key, iv);

    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }
  //#endregion orderIdAesDecrypt [ 訂單ID 解密 ]

  //#region genDataChain [ 生成資料鏈串的函式，用於將訂單物件轉換成資料鏈串。 ]
  /**
   * 生成資料鏈串的函式，用於將訂單物件轉換成資料鏈串。
   * @param order 訂單物件
   * @returns 轉換後的資料鏈串
   */
  genDataChain(order: IOrderParams) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI
    return `MerchantID=${this.merchantId}&RespondType=${this.respondType}&TimeStamp=${
      order.timeStamp
    }&Version=${this.version}&MerchantOrderNo=${order.merchantOrderNo}&Amt=${
      order.amt
    }&ItemDesc=${encodeURIComponent(order.itemDesc)}&Email=${encodeURIComponent(order.email)}`;
  }
  //#endregion genDataChain [ 生成資料鏈串的函式，用於將訂單物件轉換成資料鏈串。 ]

  //#region createMpgAesEncrypt [ 建立 MpgAesEncrypt，用於對交易資訊進行 AES 加密。 ]
  /**
   * 建立 MpgAesEncrypt，用於對交易資訊進行 AES 加密。
   * @param TradeInfo 交易資訊物件
   * @returns AES 加密後的結果
   */
  createMpgAesEncrypt(
    TradeInfo: IOrderParams,
    useKey: string,
    useIv: string,
    algorithm: string = 'aes-256-cbc',
  ) {
    // 對應文件 P17：使用 aes 加密
    // $edata1=bin2hex(openssl_encrypt($data1, "AES-256-CBC", $key, OPENSSL_RAW_DATA, $iv));

    // 使用指定的 hashKey 和 hashIv 建立加密器
    const encrypt = crypto.createCipheriv(algorithm, useKey, useIv);

    // 使用 UTF-8 編碼將交易資訊轉換為字串後進行加密，並將結果轉換為十六進位表示
    const enc = encrypt.update(this.genDataChain(TradeInfo), 'utf8', 'hex');

    // 完成加密，並將最終結果轉換為十六進位表示
    return enc + encrypt.final('hex');
  }
  //#endregion createMpgAesEncrypt [ 建立 MpgAesEncrypt，用於對交易資訊進行 AES 加密。 ]

  //#region createMpgShaEncrypt [ 建立 MpgShaEncrypt，用於對 AES 加密結果進行 SHA-256 雜湊加密。 ]
  /**
   * 建立 MpgShaEncrypt，用於對 AES 加密結果進行 SHA-256 雜湊加密。
   * @param aesEncrypt AES 加密結果
   * @returns SHA-256 雜湊加密後的結果
   */
  createMpgShaEncrypt(aesEncrypt: any, useKey: string, useIv: string) {
    // 對應文件 P18：使用 sha256 加密
    // $hashs="HashKey=".$key."&".$edata1."&HashIV=".$iv;

    // 建立 SHA-256 雜湊加密器
    const sha = crypto.createHash('sha256');

    // 準備進行雜湊加密的明文，格式為 "HashKey=xxx&AesEncrypt=xxx&HashIV=xxx"
    const plainText = `HashKey=${useKey}&${aesEncrypt}&HashIV=${useIv}`;

    // 使用 SHA-256 雜湊加密器對明文進行雜湊運算，並將結果轉換為十六進位表示，最後轉換為大寫字母
    return sha.update(plainText).digest('hex').toUpperCase();
  }
  //#endregion createMpgShaEncrypt [ 建立 MpgShaEncrypt，用於對 AES 加密結果進行 SHA-256 雜湊加密。 ]

  //#region createMpgAesDecrypt [ 建立 MpgAesDecrypt，用於對交易資訊進行 AES 解密。 ]
  /**
   * 建立 MpgAesDecrypt，用於對交易資訊進行 AES 解密。
   * @param TradeInfo AES 加密後的交易資訊
   * @returns 解密後的交易資訊，以 JSON 格式返回
   * @throws 如果 HashKey 或 HashIV 為空，則拋出錯誤
   */
  createMpgAesDecrypt(
    TradeInfo: any,
    useKey: string,
    useIv: string,
    algorithm: string = 'aes-256-cbc',
  ) {
    // 使用 AES-256-CBC 演算法建立解密器
    const decrypt = crypto.createDecipheriv(algorithm, useKey, useIv);

    // 取消自動填充，因為交易資訊可能沒有填滿區塊大小
    decrypt.setAutoPadding(false);

    // 對加密後的交易資訊進行解密，結果以 UTF-8 格式返回
    const text = decrypt.update(TradeInfo, 'hex', 'utf8');
    const plainText = text + decrypt.final('utf8');

    // 移除明文中的控制字元和空格
    const result = plainText.replace(/[\x00-\x20]+/g, '');

    // 解析 JSON 格式的交易資訊並返回
    return JSON.parse(result);
  }
  //#endregion createMpgAesDecrypt [ 建立 MpgAesDecrypt，用於對交易資訊進行 AES 解密。 ]

  //#region postNotifyAsync [ 結帳完成 - 請求傳給後端 ]
  /** 結帳完成 - 請求傳給後端 */
  async postNotifyAsync(orderNotify: any) {
    const info = this.createMpgAesDecrypt(
      orderNotify.TradeInfo,
      this.goldFlowHashKey,
      this.goldFlowHashIv,
      this.goldFlowAlgorithm,
    );
    const merchantOrderNo = info.Result.MerchantOrderNo;

    const putOrder = await this.orderModel.findOneAndUpdate(
      { merchantOrderNo: merchantOrderNo },
      {
        $set: { isPayment: true, updatedAt: new Date() },
      },
    );

    if (!putOrder) return 0;

    const deleteShoppingCart = await this.shoppingCartModel.deleteOne({ user: putOrder.user });

    if (!deleteShoppingCart) return 1;

    return putOrder;
  }
  //#endregion postNotifyAsync [ 結帳完成 - 請求傳給後端 ]
}
