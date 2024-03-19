import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './dto/cart.entity';
import { CoursesModule } from '@/courses/courses.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cart]), CoursesModule],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
