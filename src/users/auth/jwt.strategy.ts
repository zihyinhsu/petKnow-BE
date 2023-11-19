import { UsersService } from './../users.service';
// passport 採用了 策略模式 來管理各種驗證方式，它主要由兩個部分構成整個帳戶驗證程序，分別為：passport 與 passport strategy。passport 本身是用來處理 驗證流程 的，
// 而 passport strategy 則是 驗證機制，兩者缺一不可，整個 passport 生態系有上百種的驗證機制讓開發人員使用，
// 如：facebook 驗證策略、google 驗證策略、本地驗證策略等，完美解決各種驗證機制的處理
import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt'; // yarn add passport-jwt

// 用于处理 JSON Web Token (JWT) 的验证
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersService: UsersService, // private jwtService: JwtService,
  ) {
    super({
      //这里调用了基类 super 的构造函数，并传递了一个配置对象。
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // jwtFromRequest 选项告诉 Passport 从请求的授权头中提取 JWT，这意味着 JWT 应该以 Bearer Token 的形式出现在请求头中。
      secretOrKey: process.env.JWT_SECRETE, //secretOrKey 选项是用于验证 JWT 签名的密钥，它通常存储在环境变量中。
      ignoreExpiration: false,
    });
  }
  // 驗證token
  async validate(payload: any) {
    const userId = payload.sub;
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new UnauthorizedException('請先登入');
    }
    return user;
  }
}
