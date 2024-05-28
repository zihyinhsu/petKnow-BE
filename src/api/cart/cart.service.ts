import { CoursesService } from './../courses/courses.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from '@api/cart/dto/cart.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private repo: Repository<Cart>,
    private coursesService: CoursesService,
  ) {}

  async addToCart(courseId: string, ownerId): Promise<Cart> {
    if (!ObjectId.isValid(courseId)) throw new NotFoundException('找不到此課程');

    const cart = await this.repo.findOneBy({
      ownerId: new ObjectId(ownerId),
    });
    let result;
    if (!cart) {
      const firstCourse = await this.coursesService.findOne(courseId);
      result = this.repo.create({
        coursesId: [courseId],
        totalPrice: firstCourse.price,
        ownerId,
      });
    } else if (cart && courseId) {
      // 如果購物車已經有這個課程，就不要再加入
      if (cart.coursesId.includes(courseId)) {
        throw new NotFoundException('此課程已在購物車中');
      } else {
        cart.coursesId.push(courseId);
        const courses = await Promise.all(
          cart.coursesId.map(item => {
            const course = this.coursesService.findOne(item);
            return course;
          }),
        );
        cart.totalPrice = courses.reduce((total, item) => total + item.price, 0);
        result = cart;
      }
    }
    return this.repo.save(result);
  }

  // 取得該帳號的購物車資料
  async getCart(ownerId, existCode): Promise<Cart> {
    const cart = await this.repo.findOneBy({
      ownerId,
    });
    if (!cart) {
      const result = this.repo.create({
        coursesId: [],
        ownerId,
      });
      return this.repo.save(result);
    }

    if (existCode) {
      cart.discountedPrice = cart.totalPrice * (existCode.discountPersent / 100);
      cart.isCouponUsed = true;
      await this.repo.save(cart);
    }
    const result = cart;
    result.courses = await Promise.all(
      cart.coursesId.map(item => {
        const course = this.coursesService.findOne(item);
        return course;
      }),
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
    cart.coursesId = cart.coursesId.filter(item => item !== courseId);
    const updateResult = await this.repo.create(cart);
    const result = await this.repo.save(updateResult);
    return result;
  }

  // 清空購物車
  async deleteCart(ownerId): Promise<Cart> {
    const cart = await this.repo.findOneBy({
      ownerId,
    });
    if (!cart) throw new NotFoundException('購物車為空');
    return this.repo.remove(cart);
  }
}
