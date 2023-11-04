import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterRemove,
  AfterUpdate,
} from 'typeorm'; //裝飾器
import { Exclude } from 'class-transformer'; // 濾掉不想顯示的欄位(保護敏感資訊)
@Entity()
export class User {
  @PrimaryGeneratedColumn() // 自動生成ID
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  token: string;

  // Entity Listener
  // 簡單來說就是Entity有讀取、新增、修改、刪除的動作之前或之後可以做一些事情
  @AfterInsert()
  logInsert() {
    console.log('Insert User with id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Update User with id', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Remove User with id', this.id);
  }
}
