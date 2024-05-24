import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

//#region IPlatformCoupon [ 平台優惠卷資料結構 ]
/**
 * 平台優惠卷資料結構
 */
interface IPlatformCoupon {
  // UPDATE: 未完層項目，未來改成讀取 courseTags 資料表
  /** 標籤名稱 */
  names: string[];
  /** 優惠卷代碼 */
  couponCode: string;
  /** 優惠價格 */
  price: number;
  /** 開始日期 */
  startDate: Date;
  /** 結束日期 */
  endDate: Date;
  /** 是否啟用 */
  isEnabled: boolean;
  /** 創建時間 */
  createdAt?: Date;
  /** 更新時間 */
  updatedAt?: Date;
}
//#endregion IPlatformCoupon [ 平台優惠卷資料結構 ] End

//#region PlatformCoupon [ 平台優惠卷資料表 ]
/**
 * 平台優惠卷資料表
 */
@Schema({ timestamps: true })
class PlatformCoupon extends Document implements IPlatformCoupon {
  /** 標籤名稱 */
  @Prop({ type: [String], default: [] })
  names: string[];

  /** 優惠卷代碼 */
  @Prop({ required: true, maxlength: 20 })
  couponCode: string;

  /** 優惠價格 */
  @Prop({ required: true })
  price: number;

  /** 開始日期 */
  @Prop({ required: true })
  startDate: Date;

  /** 結束日期 */
  @Prop({ required: true })
  endDate: Date;

  /** 是否啟用 */
  @Prop({ required: true, default: false })
  isEnabled: boolean;

  /** 創建時間 */
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  /** 更新時間 */
  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}
//#endregion PlatformCoupon [ 平台優惠卷資料表 ] End

const PlatformCouponSchema = SchemaFactory.createForClass(PlatformCoupon);

export { PlatformCoupon, PlatformCouponSchema, IPlatformCoupon };
