import { User } from '@data/schema/user.schema';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import * as bcrypt from 'bcrypt';
import { Role } from '@data/enum/role.enum';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async signup(createUserData: CreateUserDto): Promise<User> {
    const { email, password, name } = createUserData;
    const ExitUser = await this.findOne(email);
    if (ExitUser) throw new BadRequestException('此 email 已被使用');
    // 記得先載 bcryptjs 套件
    const hashedPassword = String(bcrypt.hashSync(password, 12)); //密碼加密 10代表工作因子 通常，工作因子的值在 10 到 12 之间被认为是相对安全的，但您可以根据您的安全需求和性能需求来调整这个值。
    const createdUser = new this.userModel({
      email,
      name,
      password: hashedPassword,
      role: Role.STUDENT, // 預設身份為學生
    });

    // 要先建立實例，entity listener 才會執行，如果沒建立實例，直接存物件
    // 如：this.repo.save（{email,password}） 就不會觸發 entity listener
    return createdUser.save();
  }

  async findOne(query): Promise<User> {
    if (!query) return null;
    const user = await this.userModel.findOne({
      where: query.includes('@') ? { email: query } : { _id: new ObjectId(query) },
    });
    return user;
  }
}
