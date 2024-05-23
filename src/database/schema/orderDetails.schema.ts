import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

//#region IOrderDetail [ 訂單詳情資料結構 ]
/**
 * 訂單詳情資料結構
 */
interface IOrderDetail {
  /** 訂單 ID */
  order: Types.ObjectId;
  /** 課程 ID */
  course: Types.ObjectId;
  /** 商品名稱 */
  title: string;
  /** 價格 */
  price: number;
  /** 折扣價格 */
  discountPrice?: number;
  /** 是否免費 */
  isFree?: boolean;
  /** 創建時間 */
  createdAt?: Date;
  /** 更新時間 */
  updatedAt?: Date;
}
//#endregion IOrderDetail [ 訂單詳情資料結構 ] End

//#region OrderDetail [ 訂單詳情資料表 ]
/**
 * 訂單詳情資料表
 * @export
 * @class OrderDetail
 * @extends {Document}
 */
@Schema({ timestamps: true })
class OrderDetail extends Document implements IOrderDetail {
  /** 訂單 ID */
  @Prop({
    type: Types.ObjectId,
    ref: 'Order',
    required: [true, '請填寫必填欄位'],
  })
  order: Types.ObjectId;

  /** 課程 ID */
  @Prop({
    type: Types.ObjectId,
    ref: 'CourseHierarchys',
    required: [true, '請填寫必填欄位'],
  })
  course: Types.ObjectId;

  /** 課程標題 */
  @Prop({ required: [true, '請填寫必填欄位'] })
  title: string;

  /** 價格 */
  @Prop({ required: [true, '請填寫必填欄位'] })
  price: number;

  /** 折扣價格 */
  @Prop()
  discountPrice?: number;

  /** 是否免費 */
  @Prop()
  isFree?: boolean;

  /** 創建時間 */
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  /** 更新時間 */
  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}
//#endregion OrderDetail [ 訂單詳情資料表 ] End

const OrderDetailSchema = SchemaFactory.createForClass(OrderDetail);

export { OrderDetail, OrderDetailSchema, IOrderDetail };
