import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

//#region User [ 使用者資料結構 ]
/**
 * 使用者資料結構
 */
interface IUser {
  /** 身份 Id */
  roleName: string[];
  /** 名字 */
  name: string;
  /** 大頭照 */
  mugShot: string;
  /** 電子郵件 */
  email: string;
  /** 密碼 (加密存儲) */
  password: string;
  /** 講師簡介 */
  lecturerBio: string;
  /** 是否凍結 */
  isFrozen: boolean;
  /** 是否啟用通知 */
  isNotificationEnabled: boolean;
  /** 是否啟用隱私 */
  isPrivacyEnabled: boolean;
  /** 最後登入時間 */
  lastLoginTime?: Date;
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
  // UPDATE:  @Prop({ type: [String], required: true }) // 暫時不做身分權限
  @Prop({ type: [String] })
  roleName: string[];

  /** 名字 */
  @Prop({ required: true, maxlength: 50 })
  name: string;

  /** 大頭照 */
  @Prop({ maxlength: 255 })
  mugShot: string;

  /** 電子郵件 */
  @Prop({ required: true, unique: true, maxlength: 255 })
  email: string;

  /** 密碼 (加密存儲) */
  @Prop({ required: true, maxlength: 255 })
  password: string;

  /** 講師簡介 */
  @Prop({ maxlength: 5000 })
  lecturerBio: string;

  /** 是否凍結 */
  @Prop({ required: true, default: true })
  isFrozen: boolean;

  /** 是否啟用通知 */
  @Prop({ required: true, default: true })
  isNotificationEnabled: boolean;

  /** 是否啟用隱私 */
  @Prop({ required: true, default: true })
  isPrivacyEnabled: boolean;

  /** 創建時間 */
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  /** 更新時間 */
  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;

  /** 最後登入時間 */
  @Prop({ type: Date, default: null })
  lastLoginTime: Date;
}
//#endregion User [ 使用者資料表 ] End

const UserSchema = SchemaFactory.createForClass(User);

export { User, UserSchema, IUser };
