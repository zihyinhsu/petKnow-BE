import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

//#region ICourseTag [ 課程標籤資料結構 ]
/**
 * 課程標籤資料結構
 */
interface ICourseTag {
  /** 標籤名稱 */
  name: string;
  /** 創建時間 */
  createdAt?: Date;
  /** 更新時間 */
  updatedAt?: Date;
}
//#endregion ICourseTag [ 課程標籤資料結構 ] End

//#region CourseTag [ 課程標籤資料表 ]
/**
 * 課程標籤資料表
 */
@Schema({ timestamps: true })
class CourseTag extends Document implements ICourseTag {
  /** 標籤名稱 */
  @Prop({
    unique: true,
    required: [true, '標籤未填寫'],
  })
  name: string;

  /** 創建時間 */
  @Prop({ type: Date, default: Date.now })
  createdAt?: Date;

  /** 更新時間 */
  @Prop({ type: Date, default: Date.now })
  updatedAt?: Date;
}
//#endregion CourseTag [ 課程標籤資料表 ] End

const CourseTagSchema = SchemaFactory.createForClass(CourseTag);

export { CourseTag, CourseTagSchema, ICourseTag };
