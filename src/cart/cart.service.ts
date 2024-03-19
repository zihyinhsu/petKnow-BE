import { CoursesService } from '@/courses/courses.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from '@/cart/dto/cart.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private repo: Repository<Cart>,
    private coursesService: CoursesService,
  ) {}

  async addToCart(courseId: string, ownerId): Promise<Cart> {
    if (!ObjectId.isValid(courseId))
      throw new NotFoundException('找不到此課程');

    const cart = await this.repo.findOneBy({
      ownerId,
    });

    let result;
    if (!cart) {
      result = this.repo.create({
        coursesId: [courseId],
        ownerId,
      });
    } else {
      // 如果購物車已經有這個課程，就不要再加入
      if (cart.coursesId.includes(courseId)) {
        throw new NotFoundException('此課程已在購物車中');
      } else {
        cart.coursesId.push(courseId);
        result = cart;
      }
    }
    return this.repo.save(result);
  }

  // 取得該帳號的購物車資料
  async getCart(ownerId): Promise<Cart> {
    const cart = await this.repo.findOneBy({
      ownerId,
    });
    if (!cart) {
      const result = this.repo.create({
        coursesId: [],
        courses: [],
        ownerId,
      });
      return this.repo.save(result);
    }
    cart.courses = await Promise.all(
      cart.coursesId.map(async (item) => {
        const course = await this.coursesService.findOne(item);
        return course;
      }),
    );

    cart.totalPrice = cart.courses.reduce(
      (total, item) => total + item.price,
      0,
    );
    cart.discountedPrice = cart.courses.reduce(
      (total, item) => total + item.discountPrice,
      0,
    );

    return cart;
  }

  // 從購物車移除課程
  async removeFromCart(courseId, ownerId): Promise<Cart> {
    const cart = await this.repo.findOneBy({
      ownerId,
    });
    if (!cart) {
      throw new NotFoundException('購物車為空');
    }
    if (!cart.coursesId.includes(courseId)) {
      throw new NotFoundException('此課程已移除');
    }
    cart.coursesId = cart.coursesId.filter((item) => item !== courseId);
    const updateResult = await this.repo.create(cart);
    const result = await this.repo.save(updateResult);
    return result;
  }
}
