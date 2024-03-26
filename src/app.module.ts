import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CoursesModule } from './courses/courses.module';
import { CartModule } from './cart/cart.module';
import { AuthModule } from './users/auth/auth.module';
import { join } from 'path';
import { RoleGuard } from './users/auth/role.guard';
import { EnvConfigService } from './env-config/env-config.service';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mongodb',
        url: new EnvConfigService().getPatKom(),
        useNewUrlParser: true,
        logging: true,
        useUnifiedTopology: true,
        autoLoadEntities: true,
        entities: [],
        synchronize: true,
      }),
    }),
    CoursesModule,
    CartModule,
    AuthModule.register({
      global: true,
      modelPath: join(__dirname, '../casbin/model.conf'),
      policyAdapter: join(__dirname, '../casbin/policy.csv'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ClassSerializerInterceptor, RoleGuard, EnvConfigService],
})
export class AppModule {}
