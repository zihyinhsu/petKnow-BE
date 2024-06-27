import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

//#region ICourseTag [ 課程標籤資料結構 ]
/**
 * 課程標籤資料結構
 */
interface ICourseTag {
  /** 標籤名稱 */
  name: string;
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
    type: String,
    unique: true,
    required: [true, '標籤未填寫'],
  })
  name: string;
}
//#endregion CourseTag [ 課程標籤資料表 ] End

const CourseTagSchema = SchemaFactory.createForClass(CourseTag);

export { CourseTag, CourseTagSchema, ICourseTag };
