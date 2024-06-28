// UPDATE: 課程資料彙總表，暫時使用解決方案
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { LevelEnum } from '../enum/level.enum';

//#region ISubchapter [ 子章節資料結構 ]
/**
 * 子章節資料結構
 */
interface ISubchapter {
  /** 子章節 ID */
  _id: string;
  /** 子章節序號 */
  sequence: number;
  /** 子章節標題 */
  title: string;
  /** 子章節內容 */
  content?: string;
  /** 檔案名稱 */
  fileName: string;
  /** 檔案類型 */
  fileType: number;
  /** 子章節時長 */
  time: number;
}
//#endregion ISubchapter [ 子章節資料結構 ] End

//#region IChapter [ 章節資料結構 ]
/**
 * 章節資料結構
 */
interface IChapter {
  /** 章節 ID */
  _id: string;
  /** 章節序號 */
  sequence: number;
  /** 章節標題 */
  title: string;
  /** 章節總時長 */
  totalTime: number;
  /** 章節總數量 */
  totalNumber: number;
  /** 子章節 */
  subchapters: ISubchapter[];
}
//#endregion IChapter [ 章節資料結構 ] End

//#region ICourseHierarchy [ 課程彙總資料結構 ]
/**
 * 課程彙總資料結構
 */
interface ICourseHierarchy {
  /** 使用者 ID */
  user: Types.ObjectId;
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
  createdAt?: Date;
  /** 更新時間 */
  updatedAt?: Date;
  /** 章節 */
  chapters: IChapter[];
}
//#endregion ICourseHierarchy [ 課程彙總資料結構 ] End

//#region Subchapter [ 子章節資料表 ]
/**
 * 子章節資料表
 * @export
 * @class Subchapter
 * @extends {Document}
 * @implements {ISubchapter}
 */
@Schema()
export class Subchapter extends Document implements ISubchapter {
  /** 子章節 ID */
  @Prop({
    type: String,
    index: true,
    unique: true,
    required: [true, '請填寫必填欄位'],
  })
  _id: string;

  /** 子章節序號 */
  @Prop({
    type: Number,
    required: [true, '第幾子章節未填寫'],
  })
  sequence: number;

  /** 子章節標題 */
  @Prop({
    type: String,
    maxlength: 100,
    required: [true, '子章節標題未填寫'],
  })
  title: string;

  /** 子章節內容 */
  @Prop({
    type: String,
    maxlength: 5000,
    default: null,
  })
  content?: string;

  /** 檔案名稱 */
  @Prop({
    type: String,
    maxlength: 255,
    required: [true, '請填寫必填欄位'],
  })
  fileName: string;

  /** 檔案類型 */
  @Prop({
    type: Number,
    enum: [0, 1],
    required: [true, '未上傳檔案'],
  })
  fileType: number;

  /** 子章節時長 */
  @Prop({
    type: Number,
    required: [true, '請填寫必填欄位'],
  })
  time: number;
}
//#endregion Subchapter [ 子章節資料表 ] End

const SubchapterSchema = SchemaFactory.createForClass(Subchapter);

//#region Chapter [ 章節資料表 ]
/**
 * 章節資料表
 */
@Schema()
class Chapter extends Document implements IChapter {
  /** 章節 ID */
  @Prop({
    type: String,
    unique: true,
    required: [true, '請填寫必填欄位'],
  })
  _id: string;

  /** 章節序號 */
  @Prop({
    type: Number,
    required: [true, '第幾章節未填寫'],
  })
  sequence: number;

  /** 章節標題 */
  @Prop({
    type: String,
    maxlength: 100,
    required: [true, '章節標題未填寫'],
  })
  title: string;

  /** 章節總時長 */
  @Prop({
    type: Number,
    default: 0,
    required: [true, '請填寫必填欄位'],
  })
  totalTime: number;

  /** 章節總數量 */
  @Prop({
    type: Number,
    default: 0,
    required: [true, '請填寫必填欄位'],
  })
  totalNumber: number;

  /** 子章節 */
  @Prop({ type: [SubchapterSchema], default: [] })
  subchapters: ISubchapter[];
}
//#endregion Chapter [ 章節資料表 ] End

const ChapterSchema = SchemaFactory.createForClass(Chapter);

//#region CourseHierarchy [ 課程彙總資料表 ]
/**
 * 課程彙總資料表
 */
@Schema({ timestamps: true })
class CourseHierarchy extends Document implements ICourseHierarchy {
  /** 使用者 ID */
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: [true, '請填寫必填欄位'],
    index: true,
  })
  user: Types.ObjectId;

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

  /** 章節 */
  @Prop({ type: [ChapterSchema], default: [] })
  chapters: IChapter[];
}
//#endregion CourseHierarchy [ 課程彙總資料表 ] End

const CourseHierarchySchema = SchemaFactory.createForClass(CourseHierarchy);

export {
  CourseHierarchy,
  CourseHierarchySchema,
  ICourseHierarchy as ICourse,
  IChapter,
  ISubchapter,
};
