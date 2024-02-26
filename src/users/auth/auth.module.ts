import { UsersService } from './../users.service';
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { CASBIN_ENFORCER, RegisterOptions } from './rbac';
import { AuthService } from './auth.service';
import { newEnforcer } from 'casbin';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { UsersModule } from '../users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), // 使用 password Module 並指定 jwt 模式
    JwtModule.registerAsync({
      // 非同步配置
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'), // 密鑰
          signOptions: {
            expiresIn: configService.get('JWT_EXPIRES'), // 過期日
          },
        };
      },
    }),
    TypeOrmModule.forFeature([User]),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [UsersService, AuthService, JwtService, JwtStrategy],
  exports: [PassportModule, JwtStrategy, AuthService],
})
export class AuthModule {
  static register(options: RegisterOptions): DynamicModule {
    const { modelPath, policyAdapter, global } = options;
    const enforcer: Provider = {
      provide: CASBIN_ENFORCER,
      useFactory: () => {
        return newEnforcer(modelPath, policyAdapter);
      },
    };

    return {
      global,
      module: AuthModule,
      providers: [enforcer, AuthService],
      exports: [AuthService],
    };
  }
}
