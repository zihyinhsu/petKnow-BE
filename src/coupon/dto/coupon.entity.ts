import { Entity, Column, ObjectIdColumn } from 'typeorm'; //裝飾器
import { ObjectId } from 'mongodb';
import { Transform } from 'class-transformer'; // 濾掉不想顯示的欄位(保護敏感資訊)
@Entity()
export class Coupon {
  @ObjectIdColumn()
  @Transform((id: any) => id.value.toHexString(), { toPlainOnly: true }) // 只在轉換為普通對象時顯示
  _id: ObjectId;

  @Column()
  code: string;

  @Column()
  expiryDate: string;

  @Column()
  discountPersent: number;
}
