import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './api/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CoursesModule } from './api/courses/courses.module';
import { CartModule } from './api/cart/cart.module';
import { AuthModule } from './api/users/auth/auth.module';
import { join } from 'path';
import { RoleGuard } from './api/users/auth/role.guard';
import { CouponModule } from './api/coupon/coupon.module';

import { OrderModule } from './api/order/order.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.DB_URL,
      synchronize: true,
      useNewUrlParser: true,
      logging: true,
      useUnifiedTopology: true,
      autoLoadEntities: true,
    }),
    CoursesModule,
    CartModule,
    AuthModule.register({
      global: true,
      modelPath: join(__dirname, '../casbin/model.conf'),
      policyAdapter: join(__dirname, '../casbin/policy.csv'),
    }),
    CouponModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService, ClassSerializerInterceptor, RoleGuard],
})
export class AppModule {}
