import { Entity, Column, ObjectIdColumn, CreateDateColumn } from 'typeorm'; //裝飾器
import { ObjectId } from 'mongodb';
import { Transform } from 'class-transformer'; // 濾掉不想顯示的欄位(保護敏感資訊)
import { Cart } from '@api/cart/dto/cart.entity';
@Entity()
export class Order {
  @ObjectIdColumn()
  @Transform((id: any) => id.value.toHexString(), { toPlainOnly: true }) // 只在轉換為普通對象時顯示
  _id: ObjectId;

  @Column()
  @Transform((ownerId: any) => ownerId.value.toHexString(), {
    toPlainOnly: true,
  }) // 只在轉換為普通對象時顯示
  userId: ObjectId;

  @Column()
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  cartData?: Cart;
}
