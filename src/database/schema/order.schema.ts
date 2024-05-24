import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';
import { OrderDetail } from './orderDetails.schema';

//#region IOrder [ 訂單資料結構 ]
/**
 * 訂單資料結構
 */
interface IOrder {
  /** 使用者資料 */
  user: User;
  /** 訂單詳情資料 ID */
  orderDetail: OrderDetail[];
  /** 使用者名稱 */
  userName: string;
  /** 商家訂單號 */
  merchantOrderNo: string;
  /** 交易 SHA */
  tradeSha: string;
  /** 交易信息 */
  tradeInfo: string;
  /** 商家 ID */
  merchantID: string;
  /** 版本 */
  version: number;
  /** 金額 */
  price: number;
  /** 優惠卷代碼 */
  couponCode?: string;
  /** 優惠價格 */
  couponPrice?: number;
  /** 商品描述 */
  itemDesc: string;
  /** 電子郵件 */
  email: string;
  /** 時間戳 */
  timeStamp: number;
  /** 是否付款 */
  isPayment?: boolean;
  /** 創建時間 */
  createdAt?: Date;
  /** 更新時間 */
  updatedAt?: Date;
}
//#endregion IOrder [ 訂單資料結構 ] End

//#region Order [ 訂單資料表 ]
/**
 * 訂單資料表
 */
@Schema({ timestamps: true })
class Order extends Document implements IOrder {
  /** 使用者資料 */
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: [true, '請填寫必填欄位'],
  })
  user: User;

  /** 訂單詳情資料 ID */
  @Prop({
    type: Types.ObjectId,
    ref: 'OrderDetail',
    required: [true, '請填寫必填欄位'],
  })
  orderDetail: OrderDetail[];

  /** 使用者名稱 */
  @Prop({ required: [true, '請填寫必填欄位'] })
  userName: string;

  /** 商家訂單號 */
  @Prop({
    unique: true,
    index: true,
    maxlength: 30,
    required: [true, '請填寫必填欄位'],
  })
  merchantOrderNo: string;

  /** 交易 SHA */
  @Prop({ required: [true, '請填寫必填欄位'] })
  tradeSha: string;

  /** 交易信息 */
  @Prop({ required: [true, '請填寫必填欄位'] })
  tradeInfo: string;

  /** 商家 ID */
  @Prop({ maxlength: 20, required: [true, '請填寫必填欄位'] })
  merchantID: string;

  /** 版本 */
  @Prop({ maxlength: 5, required: [true, '請填寫必填欄位'] })
  version: number;

  /** 金額 */
  @Prop({ maxlength: 10, required: [true, '請填寫必填欄位'] })
  price: number;

  /** 優惠卷代碼 */
  @Prop({ maxlength: 20 })
  couponCode?: string;

  /** 優惠價格 */
  @Prop()
  couponPrice?: number;

  /** 商品描述 */
  @Prop({ maxlength: 50, required: [true, '請填寫必填欄位'] })
  itemDesc: string;

  /** 電子郵件 */
  @Prop({ maxlength: 50, required: [true, '請填寫必填欄位'] })
  email: string;

  /** 時間戳 */
  @Prop({ required: [true, '請填寫必填欄位'] })
  timeStamp: number;

  /** 是否付款 */
  @Prop({ default: false })
  isPayment?: boolean;

  /** 創建時間 */
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  /** 更新時間 */
  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}
//#endregion Order [ 訂單資料表 ] End

const OrderSchema = SchemaFactory.createForClass(Order);

export { Order, OrderSchema, IOrder };
