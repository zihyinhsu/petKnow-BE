import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';

//#region IShoppingCart [ 購物車資料結構 ]
/**
 * 購物車資料結構
 */
interface IShoppingCart {
  /** 使用者資料 */
  user: User;
  /** 課程 Id */
  courseIds: string[];
  /** 優惠卷代碼 */
  couponCode?: string;
  /** 創建時間 */
  createdAt?: Date;
  /** 更新時間 */
  updatedAt?: Date;
}
//#endregion IShoppingCart [ 購物車資料結構 ] End

//#region ShoppingCart [ 購物車資料表 ]
/**
 * 購物車資料表
 */
@Schema({ timestamps: true })
class ShoppingCart extends Document implements IShoppingCart {
  /** 使用者資料 */
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    unique: true,
    index: true,
    required: [true, '請填寫必填欄位'],
  })
  user: User;

  /** 課程 Id */
  @Prop({ type: [String], required: [true, '課程id為必填欄位'] })
  courseIds: string[];

  /** 優惠卷代碼 */
  @Prop({ maxlength: 20, default: '' })
  couponCode: string;

  /** 創建時間 */
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  /** 更新時間 */
  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}
//#endregion ShoppingCart [ 購物車資料表 ] End

const ShoppingCartSchema = SchemaFactory.createForClass(ShoppingCart);

export { ShoppingCart, ShoppingCartSchema, IShoppingCart };
