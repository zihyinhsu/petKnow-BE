import { DynamicModule, Provider } from '@nestjs/common';
import { DatabaseModule } from '@data/database.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CASBIN_ENFORCER, RegisterOptions } from './rbac';
import { newEnforcer } from 'casbin';
import { JwtStrategy } from '@api/users/auth/jwt.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
export class UserModule {
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
      module: UserModule,
      providers: [enforcer, JwtService, JwtStrategy, UserService],
      imports: [
        DatabaseModule,
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
        PassportModule.register({ defaultStrategy: 'jwt' }), // 使用 password Module 並指定 jwt 模式
      ],
      controllers: [UserController],
      exports: [UserModule, JwtStrategy, PassportModule, UserService],
    };
  }
}
