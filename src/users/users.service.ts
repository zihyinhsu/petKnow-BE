import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
      where: query.includes('@') ? { email: query } : { _id: new ObjectId(query) },
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

  // 在這裡要判斷是 google 進來的使用者還是一般使用者，如果是google進來的使用者，就要先判斷是否有此使用者，如果沒有就新增一個使用者
  async findOrCreateUser(userData): Promise<User> {
    const user = await this.repo.findOneBy({
      email: userData.email,
    });

    const googleUser = await this.repo.findOneBy({
      googleId: userData.googleId,
    });
    if (googleUser) return googleUser;
    if (user)
      throw new BadRequestException('此 email 已在本系統被註冊'); // 如果該使用者已透過系統註冊，則不能讓他再用第三方登入
    else return await this.repo.save(userData);
  }
}
