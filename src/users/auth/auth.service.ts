import { UsersService } from '@/users/users.service';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/users/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { userDto } from '@/users/dto/user.dto';
import { LoginUserDto } from '@/users/dto/login-user.dto';
import { AuthAction, CASBIN_ENFORCER, Role } from './rbac';
import { Enforcer } from 'casbin';
import { EnvConfigService } from '@/env-config/env-config.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(CASBIN_ENFORCER) private readonly enforcer: Enforcer,
    @InjectRepository(User) private repo: Repository<User>,
    private usersService: UsersService,
    private jwtService: JwtService,
    private envConfigService: EnvConfigService,
  ) {}

  // 註冊
  async signup(createUserData: userDto): Promise<User> {
    const { email, password, name } = createUserData;
    const ExitUser = await this.usersService.findOne(email);
    if (ExitUser) throw new BadRequestException('此 email 已被使用');
    // 記得先載 bcryptjs 套件
    const hashedPassword = String(bcrypt.hashSync(password, 12)); //密碼加密 10代表工作因子 通常，工作因子的值在 10 到 12 之间被认为是相对安全的，但您可以根据您的安全需求和性能需求来调整这个值。
    const user = this.repo.create({
      email,
      name,
      password: hashedPassword,
      role: Role.STUDENT, // 預設身份為學生
    });

    // 要先建立實例，entity listener 才會執行，如果沒建立實例，直接存物件
    // 如：this.repo.save（{email,password}） 就不會觸發 entity listener
    return this.repo.save(user);
  }

  // 登入
  async login(userData: LoginUserDto) {
    const { email, password } = userData;
    const ExitUser = await this.usersService.findOne(email);
    let token: string = '';
    if (ExitUser) {
      if (password) {
        const { password: hashedPassword } = ExitUser;
        // 確認輸入的密碼是否正確
        const pass = await bcrypt.compare(password, hashedPassword);
        if (!pass) return null;
      }

      token = await this.jwtService.sign(
        {
          sub: ExitUser._id,
          username: ExitUser.name,
          role: ExitUser.role,
        },
        {
          secret: this.envConfigService.getJwtSecret(),
        },
      );
    }
    return { token };
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
