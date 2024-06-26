import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '@data/enum/role.enum';

//#region User [ 使用者資料結構 ]
/**
 * 使用者資料結構
 */
interface IUser {
  /** 身份 Id */
  role?: Role[];
  /** 名字 */
  name: string;
  /** 大頭照 */
  mugShot?: string;
  /** 電子郵件 */
  email: string;
  /** 密碼 (加密存儲) */
  password: string;
  /** 講師簡介 */
  lecturerBio?: string;
  /** 創建時間 */
  createdAt?: Date;
  /** 更新時間 */
  updatedAt?: Date;
}
//#endregion User [ 使用者資料結構 ] End

//#region User [ 使用者資料表 ]
/**
 * 使用者資料表
 */
@Schema({ timestamps: true })
class User extends Document implements IUser {
  /** 身份 Id */
  @Prop({ type: [String], enum: Role, default: [Role.STUDENT] })
  role: Role[];

  /** 名字 */
  @Prop({ type: String, required: true, maxlength: 50, minlength: 3 })
  name: string;

  /** 大頭照 */
  @Prop({ type: String, maxlength: 255 })
  mugShot: string;

  /** 電子郵件 */
  @Prop({ type: String, required: true, unique: true, maxlength: 255 })
  email: string;

  /** 密碼 (加密存儲) */
  @Prop({ type: String, required: true, maxlength: 255 })
  password: string;

  /** 個人簡介 */
  @Prop({ type: String, maxlength: 5000 })
  lecturerBio: string;

  /** 創建時間 */
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  /** 更新時間 */
  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}
//#endregion User [ 使用者資料表 ] End

const UserSchema = SchemaFactory.createForClass(User);

export { User, UserSchema, IUser };
