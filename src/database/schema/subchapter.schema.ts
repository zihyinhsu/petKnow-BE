import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

//#region ISubchapter [ 子章節資料結構 ]
/**
 * 子章節資料結構
 */
interface ISubchapter {
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

//#region Subchapter [ 子章節資料表 ]
/**
 * 子章節資料表
 */
@Schema()
class Subchapter extends Document implements ISubchapter {
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

export { Subchapter, SubchapterSchema, ISubchapter };
