import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  // 取得單一使用者資料
  async findOne(query): Promise<User> {
    console.log('type', typeof query, query);
    if (!query) return null;
    const user = await this.repo.findOne({
      where:
        typeof query === 'string'
          ? { email: query }
          : typeof query === 'number'
          ? { id: query }
          : {},
    });

    return user;
  }
}
