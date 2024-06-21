import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesModule } from './courses/courses.module';
import { CartModule } from './cart/cart.module';
import { CouponModule } from './coupon/coupon.module';
import { OrderModule } from './order/order.module';
import { AuthModule } from './users/auth/auth.module';
import { join } from 'path';
import { BackstageModule } from './backstage/backstage.module';
import { FakeInformationModule } from './fake-information/fake-information.module';

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
      modelPath: join(process.cwd(), 'casbin/model.conf'),
      policyAdapter: join(process.cwd(), 'casbin/policy.csv'),
    }),
    CouponModule,
    OrderModule,
    BackstageModule,
    FakeInformationModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class ApiModule {}
