import { Entity, Column, ObjectIdColumn } from 'typeorm'; //裝飾器
import { ObjectId } from 'mongodb';
import { Transform } from 'class-transformer'; // 濾掉不想顯示的欄位(保護敏感資訊)
@Entity()
export class Courses {
  @ObjectIdColumn()
  @Transform((id: any) => id.value.toHexString(), { toPlainOnly: true }) // 只在轉換為普通對象時顯示
  _id: ObjectId;

  @Column()
  title: string;

  @Column()
  shortDescription: string;

  @Column()
  cover: string;

  @Column()
  level: string;

  @Column()
  time: number; // 要查是什麼意思

  @Column()
  total: number; // 要查是什麼意思

  @Column()
  instructorName: string;

  @Column()
  price: number;

  @Column()
  discountPrice: number;

  @Column()
  isFree: boolean;
}
