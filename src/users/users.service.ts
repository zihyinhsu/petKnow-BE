import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
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
}
