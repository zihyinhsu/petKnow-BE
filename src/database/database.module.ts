import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { EnvService } from '@app/config/env/env.service';
import { EnvModule } from '@app/config/env/env.module';
import { Chapter, ChapterSchema } from './schema/chapter.schema';
import { Course, CourseSchema } from './schema/course.schema';
import { CourseTag, CourseTagSchema } from './schema/courseTag.schema';
import { Order, OrderSchema } from './schema/order.schema';
import { OrderDetail, OrderDetailSchema } from './schema/orderDetails.schema';
import { PlatformCoupon, PlatformCouponSchema } from './schema/platformCoupon.schema';
import { ShoppingCart, ShoppingCartSchema } from './schema/shoppingCart.schema';
import { Subchapter, SubchapterSchema } from './schema/subchapter.schema';
import { User, UserSchema } from './schema/user.schema';
import { CourseHierarchy, CourseHierarchySchema } from './schema/courseHierarchy.schema';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [EnvModule],
      useFactory: async (configService: ConfigService) => ({
        uri: new EnvService(configService).getPatKomDB(),
      }),
      inject: [ConfigService],
    }),
    EnvModule,
    MongooseModule.forFeature([
      { name: CourseHierarchy.name, schema: CourseHierarchySchema },
      { name: Chapter.name, schema: ChapterSchema },
      { name: Course.name, schema: CourseSchema },
      { name: CourseTag.name, schema: CourseTagSchema },
      { name: Order.name, schema: OrderSchema },
      { name: OrderDetail.name, schema: OrderDetailSchema },
      { name: PlatformCoupon.name, schema: PlatformCouponSchema },
      { name: ShoppingCart.name, schema: ShoppingCartSchema },
      { name: Subchapter.name, schema: SubchapterSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
})
export class DatabaseModule {}
