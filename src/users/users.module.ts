import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), // 使用 password Module 並指定 jwt 模式
    JwtModule.registerAsync({
      // 非同步配置
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        // 用这些数据来配置 JWT 模块。具体来说，它使用了 ConfigService 来获取 JWT 密钥和其他选项，并将它们传递给 JwtModule，以配置 JWT 的行为。
        return {
          secret: config.get<string>('JWT_SECRETE'), // 密鑰
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRES'), // 過期日
          },
        };
      },
    }),
    TypeOrmModule.forFeature([User]),
  ], // connect entity
  controllers: [UsersController],
  providers: [UsersService, AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class UsersModule {}
