import { Entity, Column, ObjectIdColumn } from 'typeorm'; //裝飾器
import { ObjectId } from 'mongodb';
import { Exclude, Transform } from 'class-transformer'; // 濾掉不想顯示的欄位(保護敏感資訊)
import { Courses } from '@/courses/dto/courses.entity';
@Entity()
export class Cart {
  @ObjectIdColumn()
  @Transform((id: any) => id.value.toHexString(), { toPlainOnly: true }) // 只在轉換為普通對象時顯示
  _id: ObjectId;

  @Column()
  @Exclude()
  coursesId: string[]; // 儲存相關課程的 ID

  courses: Courses[]; // 從相關課程的 ID 取得相關課程的資料

  @Column()
  totalPrice: number;

  @Column()
  discountedPrice: number;

  @Column()
  @Transform((ownerId: any) => ownerId.value.toHexString(), {
    toPlainOnly: true,
  }) // 只在轉換為普通對象時顯示
  ownerId: ObjectId;
}
