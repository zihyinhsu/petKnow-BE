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
  @Prop({ type: String, maxlength: 20, default: '' })
  couponCode: string;
}
//#endregion ShoppingCart [ 購物車資料表 ] End

const ShoppingCartSchema = SchemaFactory.createForClass(ShoppingCart);

export { ShoppingCart, ShoppingCartSchema, IShoppingCart };
