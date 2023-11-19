import { UsersService } from './../users.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { userDto } from '../dto/user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  // 註冊
  async signup(createUserData: userDto): Promise<User> {
    const { email, password, name } = createUserData;
    const ExitUser = await this.validateUser(createUserData);
    if (ExitUser) throw new BadRequestException('此 email 已被使用');

    // 記得先載 bcryptjs 套件
    const hashedPassword = String(bcrypt.hashSync(password, 12)); //密碼加密 10代表工作因子 通常，工作因子的值在 10 到 12 之间被认为是相对安全的，但您可以根据您的安全需求和性能需求来调整这个值。

    const user = this.repo.create({
      email,
      name,
      password: hashedPassword,
    });

    // 要先建立實例，entity listener 才會執行，如果沒建立實例，直接存物件
    // 如：this.repo.save（{email,password}） 就不會觸發 entity listener
    return this.repo.save(user);
  }

  // 登入
  async login(userData: LoginUserDto): Promise<User> {
    const user = await this.validateUser(userData);
    let result = null;
    if (user) {
      result = user;
      result.token = await this.jwtService.signAsync({
        sub: user._id,
        username: user.name,
      });
    }

    return result;
  }

  // 驗證是否有該使用者
  async validateUser(userData: LoginUserDto): Promise<User> {
    const { email, password } = userData;
    // 是否有此帳號
    const user = await this.usersService.findOne(email);
    if (!user) {
      return null;
    }
    const { password: hashedPassword } = user;
    // 確認輸入的密碼是否正確
    const pass = await bcrypt.compare(password, hashedPassword);
    if (!pass) {
      return null;
    }
    return user;
  }
}
