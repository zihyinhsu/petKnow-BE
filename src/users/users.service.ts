import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { updateUserDto } from './dto/update-user.dto';
@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  // 取得單一使用者資料
  async findOne(query): Promise<User> {
    if (!query) return null;
    const user = await this.repo.findOne({
      where: query.includes('@')
        ? { email: query }
        : { _id: new ObjectId(query) },
    });
    return user;
  }

  // 編輯當前使用者資料
  async update(id, attrs: updateUserDto): Promise<User> {
    const user = await this.repo.findOneBy({
      _id: new ObjectId(id),
    });
    if (!user) {
      throw new NotFoundException('找不到該用戶');
    }
    // 先建立實例
    const updateResult = this.repo.create({ ...user, ...attrs });
    const result = await this.repo.save(updateResult);

    return result;
  }
}
