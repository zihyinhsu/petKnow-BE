import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Subchapter } from './subchapter.schema';

//#region IChapter [ 章節資料結構 ]
/**
 * 章節資料結構
 */
interface IChapter {
  /** 子章節資料 */
  subchapter: Subchapter[];
  /** 章節序號 */
  sequence: number;
  /** 章節標題 */
  title: string;
  /** 章節總時長 */
  totalTime: number;
  /** 章節總數量 */
  totalNumber: number;
}
//#endregion IChapter [ 章節資料結構 ] End

//#region Chapter [ 章節資料表 ]
/**
 * 章節資料表
 */
@Schema()
class Chapter extends Document implements IChapter {
  /** 子章節資料 */
  @Prop({
    type: Types.ObjectId,
    ref: 'Subchapter',
  })
  subchapter: Subchapter[];

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
}
//#endregion Chapter [ 章節資料表 ] End

const ChapterSchema = SchemaFactory.createForClass(Chapter);

export { Chapter, ChapterSchema, IChapter };
