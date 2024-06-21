import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { MyClassroomDto } from './dto/myClassroom.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from '@data/schema/order.schema';
import { CourseHierarchy } from '@data/schema/courseHierarchy.schema';
/**
 *  後台服務
 */
@Injectable()
export class BackstageService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    @InjectModel(CourseHierarchy.name)
    private readonly courseHierarchyModel: Model<CourseHierarchy>,
  ) {}
  //#region getMyClassroomAsync [ 使用者 後台 - 我的課堂 ]
  /** 使用者 後台 - 我的課堂 */
  async getMyClassroomAsync(user: Types.ObjectId) {
    const purchasedCourses = await this.orderModel.aggregate<MyClassroomDto>([
      {
        $match: {
          user: user,
          isPayment: true,
        },
      },
      {
        $lookup: {
          from: 'orderdetails', // 订单详情集合的名称
          localField: '_id',
          foreignField: 'order',
          as: 'orderDetails',
        },
      },
      {
        $project: {
          _id: 0,
          courseIds: '$orderDetails.CourseHierarchys',
        },
      },
    ]);

    const courseIds = [...new Set(purchasedCourses.flatMap(item => item.courseIds))];

    const courseHierarchys = await this.courseHierarchyModel.find({
      _id: { $in: courseIds.map(id => new Types.ObjectId(id)) },
    });

    return courseHierarchys;
  }
  //#endregion getMyClassroomAsync [ 使用者 後台 - 我的課堂 ]
}
