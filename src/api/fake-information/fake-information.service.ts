import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { IUser, User } from '@data/schema/user.schema';
import {
  ISubchapter,
  IChapter,
  ICourse,
  CourseHierarchy,
} from '@data/schema/courseHierarchy.schema';
import { courseHierarchyType } from '../../../testData/course.type.test';
import {
  courseHierarchys,
  descriptions,
  instructors,
  shortDescriptions,
} from '../../../testData/courseHierarchyData.test';
import { a_z, lables } from '../../../testData/customData.test';
import { IPlatformCoupon, PlatformCoupon } from '@data/schema/platformCoupon.schema';
import { CourseTag, ICourseTag } from '@data/schema/courseTag.schema';
import { names } from '../../../testData/userData.test';
import { CreateCourseHierarchysDto } from './dto/create-course-hierarchys.dto';
import { HttpMessage } from '@config/enums/http.enum';
import { CreateCouponManyDto } from './dto/create-coupon-many.dto';

@Injectable()
export class FakeInformationService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(CourseHierarchy.name)
    private readonly courseHierarchyModel: Model<CourseHierarchy>,
    @InjectModel(PlatformCoupon.name)
    private readonly platformCouponModel: Model<PlatformCoupon>,
    @InjectModel(CourseTag.name)
    private readonly courseTagModel: Model<CourseTag>,
  ) {}

  private generateRandomInt(max: number) {
    if (max !== 0) return Math.floor(Math.random() * max);
    return Math.random();
  }

  private getRandomDate(start: string | number | Date, end: string | number) {
    const startDate = new Date(start).getTime();
    const endDate = new Date(end).getTime();
    const randomTimestamp = startDate + Math.random() * (endDate - startDate);
    const randomDate = new Date(randomTimestamp);

    return randomDate;
  }

  private getDiscountDateScope() {
    return [new Date().getTime() + 15 * 86400000, new Date().getTime() + 365 * 86400000];
  }

  private generateRandomCourseHierarchy(
    users: string[],
    data: courseHierarchyType[][],
    covers: string[],
    fileNames: { id: string; time: number }[],
    v: number,
  ) {
    const coversLength = covers.length;
    const usersLength = users.length;
    const fileNameLength = fileNames.length;
    const shortDescriptionLength = shortDescriptions.length;
    const descriptionLength = descriptions.length;
    const newData: ICourse[] = [];
    const tagNameArr: string[] = [];

    for (let i = 0; i < data.length; i++) {
      const dataIndex = data[i];

      for (let j = 0; j < dataIndex.length; j++) {
        let discountPrice;
        let discountDate;
        let totalTime = 0;
        let totalNumber = 0;

        const courseHierarchy = dataIndex[j];
        tagNameArr.push(...courseHierarchy.tag);

        const userIndex = this.generateRandomInt(usersLength);
        const coverIndex = this.generateRandomInt(coversLength);
        const shortDescriptionIndex = this.generateRandomInt(shortDescriptionLength);
        const descriptionIndex = this.generateRandomInt(descriptionLength);

        const user = new Types.ObjectId(users[userIndex]);
        const shortDescription = shortDescriptions[shortDescriptionIndex];
        const description = descriptions[descriptionIndex];
        const tagNames = courseHierarchy.tag;
        const cover = covers[coverIndex];
        const title = courseHierarchy.title;
        const level = this.generateRandomInt(4);
        const price = this.generateRandomInt(10000);
        const enrollmentCount = this.generateRandomInt(100000);
        const isFree = this.generateRandomInt(10) === 0 ? true : false;
        const isPopular = 0 === this.generateRandomInt(10);
        const isPublished = this.generateRandomInt(10) > 0 ? true : false;
        const createdAt = this.getRandomDate('2022/01/01', '2023/05/31');
        const shelfDate = this.getRandomDate(createdAt, '2023/06/31');
        const updatedAt = this.getRandomDate(createdAt, '2023/06/31');
        const chapterArr: IChapter[] = [];

        const isDiscount = this.generateRandomInt(10) < 3 ? true : false;

        if (isDiscount) {
          discountPrice = Math.trunc(price * this.generateRandomInt(0));
          const [startDate, endDate] = this.getDiscountDateScope();
          discountDate = this.getRandomDate(startDate, endDate);
        }

        const chapters = courseHierarchy.chapters;
        for (let k = 0; k < chapters.length; k++) {
          let chapter_totalTime = 0;
          let chapter_totalNumber = 0;

          const subchapterArr: ISubchapter[] = [];
          const chapter = chapters[k];

          const chapter_id = `${a_z[i]}00${v}${j}${k}`;
          const chapter_sequence = k + 1;
          const chapter_title = chapter.title;

          const subchapters = chapter.subchapters;
          for (let l = 0; l < subchapters.length; l++) {
            const subchapter = subchapters[l];
            const fileNameIndex = this.generateRandomInt(fileNameLength);

            const subchapter_id = `${a_z[i]}00${v}${j}${k}${l}`;
            const subchapter_sequence = l + 1;
            const subchapter_title = subchapter.title;
            const fileName = fileNames[fileNameIndex].id;
            const fileType = 0;
            const subchapter_time = fileNames[fileNameIndex].time;

            subchapterArr.push({
              _id: subchapter_id,
              sequence: subchapter_sequence,
              title: subchapter_title,
              fileName,
              fileType,
              time: subchapter_time,
            });

            chapter_totalTime += subchapter_time;
            chapter_totalNumber++;
          }

          chapterArr.push({
            _id: chapter_id,
            sequence: chapter_sequence,
            title: chapter_title,
            totalTime: chapter_totalTime,
            totalNumber: chapter_totalNumber,
            subchapters: subchapterArr,
          });

          totalTime += chapter_totalTime;
          totalNumber += chapter_totalNumber;
        }

        newData.push({
          user,
          tagNames,
          cover,
          title,
          shortDescription,
          description,
          level,
          price,
          discountPrice,
          enrollmentCount,
          totalTime,
          totalNumber,
          isFree,
          isPopular,
          isPublished,
          discountDate,
          shelfDate,
          createdAt,
          updatedAt,
          chapters: chapterArr,
        });
      }
    }

    return newData;
  }

  private generateCouponCode(length: number) {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var couponCode = '';

    for (var i = 0; i < length; i++) {
      var randomIndex = Math.floor(Math.random() * characters.length);
      couponCode += characters.charAt(randomIndex);
    }

    return couponCode;
  }

  //#region getUserCourseCountGreaterThanOneAsync [ 讀取使用者開課數大於 1 ]
  /** 讀取使用者開課數大於 1 */
  async getUserCourseCountGreaterThanOneAsync() {
    const result = await this.courseHierarchyModel.aggregate([
      {
        $match: {
          isPublished: true,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $group: {
          _id: '$user._id',
          courseIds: { $push: '$_id' },
          totalCourses: { $sum: 1 },
        },
      },
      {
        $match: {
          totalCourses: { $gt: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          userId: '$_id',
          courseIds: 1,
        },
      },
      {
        $sort: {
          userId: 1,
        },
      },
      {
        $limit: 20,
      },
    ]);

    if (result.length === 0) return false;

    return result;
  }
  //#endregion getUserCourseCountGreaterThanOneAsync [ 讀取使用者開課數大於 1 ]

  //#region createCourseHierarchys [ 新增一筆課程彙總資料 ]
  /** 新增一筆課程彙總資料 */
  async createCourseHierarchys(createCourseHierarchysDto: CreateCourseHierarchysDto) {
    const { user } = createCourseHierarchysDto;

    if (!user) {
      throw new NotFoundException(HttpMessage.CreateFailure);
    }

    const newCourseHierarchy = await this.courseHierarchyModel.create(createCourseHierarchysDto);

    if (!newCourseHierarchy) {
      throw new NotFoundException(HttpMessage.CreateFailure);
    }

    return newCourseHierarchy._id.toString();
  }
  //#endregion createCourseHierarchys [ 新增一筆課程彙總資料 ]

  //#region courseHierarchyManyData [ 產生假資料 - 課程彙總資料 ]
  /** 產生假資料 - 課程彙總資料 */
  async courseHierarchyManyData() {
    const {
      dogCovers,
      catCovers,
      petCovers,
      dogFileNames,
      catFileNames,
      petFileNames,
      dagData,
      catData,
      petData,
    } = courseHierarchys;
    const newData: ICourse[] = [];

    const users = (await this.userModel.distinct('_id')) as string[];

    const deleteCourseHierarchy = await this.courseHierarchyModel.deleteMany();

    if (!deleteCourseHierarchy.acknowledged) return false;

    for (let i = 0; i < 91; i++) {
      if (i % 3 === 0)
        newData.push(
          ...this.generateRandomCourseHierarchy(users, dagData, dogCovers, dogFileNames, i),
        );
      else if (i % 3 === 1)
        newData.push(
          ...this.generateRandomCourseHierarchy(users, catData, catCovers, catFileNames, i),
        );
      else if (i % 3 === 2)
        newData.push(
          ...this.generateRandomCourseHierarchy(users, petData, petCovers, petFileNames, i),
        );
    }

    const result = await this.courseHierarchyModel.insertMany(newData);

    if (result.length === 0) throw new NotFoundException(HttpMessage.CreateFailure);

    return HttpMessage.CreateSuccess;
  }
  //#endregion courseHierarchyManyData [ 產生假資料 - 課程彙總資料 ]

  //#region couponManyData [ 產生假資料 - 平台優惠碼資料 ]
  /** 產生假資料 - 平台優惠碼資料 */
  async couponManyData(createCouponManyDto: CreateCouponManyDto) {
    const { quantity } = createCouponManyDto;
    const newData: IPlatformCoupon[] = [];

    const deleteplatformCoupons = await this.platformCouponModel.deleteMany();

    if (!deleteplatformCoupons.acknowledged) return false;

    // 產生 quantity組優惠碼
    for (let i = 0; i < quantity; i++) {
      const tagNames: string[] = [];
      const newLables = [...lables];

      const couponCode = this.generateCouponCode(8);
      const discountPrice = this.generateRandomInt(1000) + 1;
      const isEnabled = this.generateRandomInt(10) !== 0 ? true : false;
      const createdAt = this.getRandomDate('2022/01/01', '2023/05/31');
      const updatedAt = this.getRandomDate(createdAt, '2024/06/31');
      const startDate = this.getRandomDate(createdAt, '2024/06/31');
      const endDate = this.getRandomDate(startDate, '2024/06/31');

      const labelQuantity = this.generateRandomInt(3);

      for (let j = 0; j <= labelQuantity; j++) {
        const lableIndex = this.generateRandomInt(30 - j);
        tagNames.push(newLables[lableIndex]);
        newLables.splice(lableIndex, 1); // 移除已加入的標籤，避免重複加入
      }

      newData.push({
        tagNames,
        couponCode,
        price: discountPrice,
        isEnabled,
        startDate,
        endDate,
        createdAt,
        updatedAt,
      });
    }

    const result = await this.platformCouponModel.insertMany(newData);

    if (result.length === 0) throw new NotFoundException(HttpMessage.CreateFailure);

    return HttpMessage.CreateFailure;
  }
  //#endregion couponManyData [ 產生假資料 - 平台優惠碼資料 ]

  //#region courseTagManyData [ 產生假資料 - 標籤資料 ]
  /** 產生假資料 - 標籤資料 */
  async courseTagManyData() {
    const newData: ICourseTag[] = [];

    const deleteCourseTag = await this.courseTagModel.deleteMany();
    ``;
    if (!deleteCourseTag.acknowledged) return false;

    // 產生 標籤
    for (let i = 0; i < lables.length; i++) {
      newData.push({
        name: lables[i],
      });
    }

    const result = await this.courseTagModel.insertMany(newData);

    if (result.length === 0) return false;

    return true;
  }
  //#endregion courseTagManyData [ 產生假資料 - 標籤資料 ]

  //#region userManyData [ 產生假資料 - 使用者資料 ]
  /** 產生假資料 - 使用者資料 */
  async userManyData() {
    const newData: IUser[] = [];

    const namesLength = names.length;
    const instructorsLength = instructors.length;
    const deleteUser = await this.userModel.deleteMany();

    if (!deleteUser.acknowledged) return false;

    // 產生 標籤
    for (let i = 0; i < namesLength; i++) {
      const email = `Abc123${i}@gmail.com`;
      const password = 'Abc123';
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hashSync(password, salt);

      const namesIndex = this.generateRandomInt(namesLength);
      const instructorsIndex = this.generateRandomInt(instructorsLength);

      const name = names[namesIndex];
      const _instructors = instructors[instructorsIndex];

      newData.push({
        name,
        email,
        password: hashedPassword,
        lecturerBio: _instructors,
      });
    }

    const result = await this.userModel.insertMany(newData);

    if (result.length === 0) return false;

    return true;
  }
  //#endregion userManyData [ 產生假資料 - 使用者資料 ]
}
