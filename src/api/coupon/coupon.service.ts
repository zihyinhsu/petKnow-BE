import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Coupon } from './dto/coupon.entity';
import { couponDto } from './dto/coupon.dto';
import { CartService } from '@api/cart/cart.service';
import { ObjectId } from 'mongodb';

@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(Coupon) private repo: Repository<Coupon>,
    private cartsService: CartService,
  ) {}

  // 取得優惠券資料
  async find(query): Promise<any> {
    // 分頁
    const resPerPage = Number(query.rowsPerPage) || 0; // 一頁有幾筆資料
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const keyword = query.filter
      ? {
          code: {
            $regex: query.filter,
            $options: 'i',
          },
        }
      : {};

    const [rows, rowsNumber] = await this.repo.findAndCount({
      where: keyword as FindOptionsWhere<Coupon>,
      skip: skip,
      take: resPerPage,
    });
    return { rows, rowsNumber };
  }

  // 新增優惠券
  async create(couponData: couponDto): Promise<Coupon> {
    const existCode = await this.repo.findOneBy({
      code: couponData.code,
    });
    if (existCode) throw new NotFoundException('此優惠碼已存在');
    const coupon = this.repo.create(couponData);
    return this.repo.save(coupon);
  }

  // 使用優惠券，檢查優惠券是否存在與有效
  async useCoupon(couponCode: couponDto['code'], userId) {
    const existCode = await this.repo.findOneBy({
      code: couponCode,
    });
    const currentDate = new Date();
    if (existCode && currentDate <= new Date(existCode.expiryDate)) {
      await this.cartsService.getCart(userId, existCode);
      return {
        message: '優惠碼使用成功',
      };
    }
    throw new NotFoundException('此優惠碼不存在或已失效');
  }

  // 修改優惠券
  async update(id, attrs) {
    const course = await this.repo.findOneBy({
      _id: new ObjectId(id),
    });
    if (!course) {
      throw new NotFoundException('找不到該優惠券');
    }
    const updateResult = await this.repo.create({ ...course, ...attrs });
    return this.repo.save(updateResult);
  }

  // 刪除優惠券
  async remove(id): Promise<Coupon> {
    const course = await this.repo.findOneBy({
      _id: new ObjectId(id),
    });
    if (!course) {
      throw new NotFoundException('找不到該優惠券');
    }
    return this.repo.remove(course);
  }
}
