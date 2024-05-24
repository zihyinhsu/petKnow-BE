import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { LevelEnum } from '../enum/level.enum';
import { Chapter } from './chapter.schema';
import { User } from './user.schema';

//#region ICourse [ 課程資料結構 ]
/**
 * 課程資料結構
 */
interface ICourse {
  /** 使用者資料 */
  user: User;
  /** 章節資料 */
  chapter: Chapter[];
  /** 標籤名稱 */
  tagNames: string[];
  /** 封面圖片 */
  cover: string;
  /** 宣傳影片 */
  promoVideo?: string;
  /** 課程標題 */
  title: string;
  /** 簡介 */
  shortDescription: string;
  /** 詳細介紹 */
  description: string;
  /** 課程等級 */
  level: number;
  /** 課程價格 */
  price: number;
  /** 折扣價格 */
  discountPrice?: number;
  /** 註冊人數 */
  enrollmentCount: number;
  /** 總時長 */
  totalTime: number;
  /** 總數量 */
  totalNumber: number;
  /** 是否免費 */
  isFree: boolean;
  /** 是否熱門 */
  isPopular: boolean;
  /** 是否上架 */
  isPublished: boolean;
  /** 折扣日期 */
  discountDate?: Date;
  /** 上架日期 */
  shelfDate?: Date;
  /** 創建時間 */
  createdAt: Date;
  /** 更新時間 */
  updatedAt: Date;
}
//#endregion ICourse [ 課程資料結構 ] End

//#region Course [ 課程資料表 ]
/**
 * 課程資料表
 */
@Schema({ timestamps: true })
class Course extends Document implements ICourse {
  /** 使用者資料 */
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: [true, '請填寫必填欄位'],
    index: true,
  })
  user: User;

  /** 章節資料 */
  @Prop({
    type: Types.ObjectId,
    ref: 'Chapter',
  })
  chapter: Chapter[];

  /** 標籤名稱 */
  @Prop({ type: [String], default: [] })
  tagNames: string[];

  /** 封面圖片 */
  @Prop({ type: String, maxlength: 255, required: [true, '封面圖片未上傳'] })
  cover: string;

  /** 宣傳影片 */
  @Prop({ type: String, maxlength: 255, default: null })
  promoVideo?: string;

  /** 課程標題 */
  @Prop({ type: String, maxlength: 255, required: [true, '課程標題未填寫'], index: true })
  title: string;

  /** 簡介 */
  @Prop({ type: String, maxlength: 500, required: [true, '簡介未填寫'] })
  shortDescription: string;

  /** 詳細介紹 */
  @Prop({ type: String, maxlength: 5000, required: [true, '詳細介紹未填寫'] })
  description: string;

  /** 課程等級 */
  @Prop({ type: Number, enum: LevelEnum, default: LevelEnum.所有級別, index: true })
  level: number;

  /** 課程價格 */
  @Prop({ type: Number, index: true })
  price: number;

  /** 折扣價格 */
  @Prop({ type: Number })
  discountPrice?: number;

  /** 註冊人數 */
  @Prop({ type: Number, default: 0 })
  enrollmentCount: number;

  /** 總時長 */
  @Prop({ type: Number, default: 0 })
  totalTime: number;

  /** 總數量 */
  @Prop({ type: Number, default: 0 })
  totalNumber: number;

  /** 是否免費 */
  @Prop({ type: Boolean, default: false })
  isFree: boolean;

  /** 是否熱門 */
  @Prop({ type: Boolean, default: false })
  isPopular: boolean;

  /** 是否上架 */
  @Prop({ type: Boolean, default: false, required: [true, '是否上架未填寫'] })
  isPublished: boolean;

  /** 折扣日期 */
  @Prop({ type: Date, default: null })
  discountDate?: Date;

  /** 上架日期 */
  @Prop({ type: Date, default: null })
  shelfDate?: Date;

  /** 創建時間 */
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  /** 更新時間 */
  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}
//#endregion Course [ 課程資料表 ] End

const CourseSchema = SchemaFactory.createForClass(Course);

export { Course, CourseSchema, ICourse };
