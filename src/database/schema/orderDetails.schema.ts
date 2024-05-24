import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Course } from './course.schema';
import { Order } from './order.schema';

//#region IOrderDetail [ 訂單詳情資料結構 ]
/**
 * 訂單詳情資料結構
 */
interface IOrderDetail {
  /** 訂單資料 */
  order: Order;
  /** 課程資料 */
  course: Course;
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
  /** 訂單資料 */
  @Prop({
    type: Types.ObjectId,
    ref: 'Order',
    required: [true, '請填寫必填欄位'],
  })
  order: Order;

  /** 課程資料 */
  @Prop({
    type: Types.ObjectId,
    ref: 'Course',
    required: [true, '請填寫必填欄位'],
  })
  course: Course;

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
