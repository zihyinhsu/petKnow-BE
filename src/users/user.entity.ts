import {
  Entity,
  Column,
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  ObjectIdColumn,
} from 'typeorm'; //裝飾器
import { ObjectId } from 'mongodb';
import { Exclude, Transform } from 'class-transformer'; // 濾掉不想顯示的欄位(保護敏感資訊)
@Entity()
export class User {
  @ObjectIdColumn()
  @Transform((id: any) => id.value.toHexString(), { toPlainOnly: true }) // 只在轉換為普通對象時顯示
  _id: ObjectId;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  // @Column()
  // token?: string;

  // Entity Listener
  // 簡單來說就是Entity有讀取、新增、修改、刪除的動作之前或之後可以做一些事情
  @AfterInsert()
  logInsert() {
    console.log('Insert User with id', this._id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Update User with id', this._id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Remove User with id', this._id);
  }
}
