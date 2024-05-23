import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

//#region IShoppingCart [ 購物車資料結構 ]
/**
 * 購物車資料結構
 */
interface IShoppingCart {
  /** 使用者 Id */
  user: Types.ObjectId;
  /** 優惠卷 Id */
  courseIds: string[];
  /** 使用者 Id */
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
  /** 使用者 Id */
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    unique: true,
    index: true,
    required: [true, '請填寫必填欄位'],
  })
  user: Types.ObjectId;

  /** 優惠卷 Id */
  @Prop({ type: [String], required: [true, '課程id為必填欄位'] })
  courseIds: string[];

  /** 使用者 Id */
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
