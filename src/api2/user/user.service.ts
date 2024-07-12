import { User } from '@data/schema/user.schema';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
// import { ObjectId } from 'mongodb';
import * as bcrypt from 'bcrypt';
import { Role } from '@data/enum/role.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthAction, CASBIN_ENFORCER } from './rbac';
import { Enforcer } from 'casbin';

@Injectable()
export class UserService {
  constructor(
    @Inject(CASBIN_ENFORCER) private readonly enforcer: Enforcer,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

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
  // 登入
  async login(userData: LoginUserDto) {
    const { email, password } = userData;
    const ExitUser = await this.findOne(email);
    let token = '';
    if (ExitUser) {
      if (password) {
        const { password: hashedPassword } = ExitUser;
        // 確認輸入的密碼是否正確
        const pass = await bcrypt.compare(password, hashedPassword);
        if (pass) {
          token = await this.jwtService.sign(
            {
              sub: ExitUser._id,
              username: ExitUser.name,
              role: ExitUser.role,
            },
            {
              secret: process.env.JWT_SECRET,
            },
          );
        }
      }
    }
    return { token };
  }
  async findOne(email?: string, id?: string): Promise<User> {
    if (!email && !id) return null;
    const user = await this.userModel.findOne({
      $or: [{ email: email }, { _id: new Types.ObjectId(id) }],
    });
    return user;
  }

  // 判斷是否有權限
  checkPermission(sub: string, obj: string, act: AuthAction) {
    return this.enforcer.enforce(sub, obj, act);
  }

  mappingAction(method: string) {
    const table: Record<string, AuthAction> = {
      POST: AuthAction.CREATE,
      GET: AuthAction.READ,
      PATCH: AuthAction.UPDATE,
      DELETE: AuthAction.DELETE,
    };
    return table[method.toUpperCase()] || AuthAction.READ;
  }
}
