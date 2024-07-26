import { PlatformCoupon } from '@data/schema/platformCoupon.schema';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlatformCouponDTO } from './input/create-platform-coupon.dto';
import { UpdatePlatformCouponDTO } from './input/update-platform-coupon.dto';

@Injectable()
export class PlatformCouponsService {
  constructor(
    @InjectModel(PlatformCoupon.name) private readonly platformCouponModel: Model<PlatformCoupon>,
  ) {}

  async getAll() {
    const result = await this.platformCouponModel.find().lean().exec();

    return result;
  }

  async create(createDto: CreatePlatformCouponDTO): Promise<PlatformCoupon> {
    const isExistingTag = await this.platformCouponModel
      .findOne({ couponCode: createDto.couponCode })
      .exec();

    if (isExistingTag) {
      throw new BadRequestException('此優惠卷已存在');
    }

    const createdTag = new this.platformCouponModel(createDto);
    return createdTag.save();
  }

  async findById(id: string): Promise<PlatformCoupon> {
    return this.platformCouponModel.findById(id).lean().exec();
  }

  async update(id: string, updateDto: UpdatePlatformCouponDTO): Promise<PlatformCoupon> {
    return this.platformCouponModel.findByIdAndUpdate(id, updateDto, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.platformCouponModel.findByIdAndDelete(id).exec();
    return result !== null;
  }
}
