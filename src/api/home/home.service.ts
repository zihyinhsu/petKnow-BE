import { EnvService } from '@config/env/env.service';
import { CourseHierarchy } from '@data/schema/courseHierarchy.schema';
import { CourseTag } from '@data/schema/courseTag.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { HomeSearchCoursesDto } from './output/home-search-courses.dto';
import { LevelEnum } from '@data/enum/level.enum';

@Injectable()
export class HomeService {
  private readonly coverUrl;
  private readonly coverParamsUrl;

  constructor(
    @InjectModel(CourseHierarchy.name)
    private readonly courseHierarchyModel: Model<CourseHierarchy>,
    @InjectModel(CourseTag.name)
    private readonly courseTagModel: Model<CourseTag>,
    private readonly envService: EnvService,
  ) {
    this.coverUrl = this.envService.getCoverUrl();
    this.coverParamsUrl = this.envService.getCoverParamsUrl();
  }

  //#region getIndexAsync [ 首頁 ]
  /** 首頁 */
  async getIndexAsync() {
    const currentDate = new Date();

    const [carousel] = await this.courseHierarchyModel.aggregate([
      {
        $match: {
          // 添加筛选条件
          isPublished: true,
          isPopular: true,
        },
      },
      { $sample: { size: 10 } }, // 讀取 10筆並隨機排序
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $group: {
          _id: null,
          carousel: {
            $push: {
              _id: '$_id',
              title: '$title',
              cover: { $concat: [this.coverUrl, '$cover', this.coverParamsUrl] },
              instructorName: { $arrayElemAt: ['$user.name', 0] },
            },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          carousel: 1,
        },
      },
    ]);

    const popular = await this.courseHierarchyModel.aggregate([
      { $unwind: '$tagNames' },
      {
        $match: {
          // 添加筛选条件
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
        $group: {
          _id: '$tagNames',
          courses: {
            $push: {
              _id: '$_id',
              title: '$title',
              cover: { $concat: [this.coverUrl, '$cover', this.coverParamsUrl] },
              instructorName: { $arrayElemAt: ['$user.name', 0] },
              price: '$price',
              discountPrice: {
                $cond: [
                  {
                    $and: [
                      { $ifNull: ['$discountDate', false] }, // 判斷特價日期不為空
                      { $gte: ['$discountDate', currentDate] }, // 判斷特價日期大於等於今天
                    ],
                  },
                  '$discountPrice',
                  null,
                ],
              },
              isFree: '$isFree',
            },
          },
          count: { $sum: 1 },
        },
      },
      {
        $match: {
          count: { $gt: 5 },
        },
      },
      { $sample: { size: 4 } },
      {
        $project: {
          _id: 0,
          tag: '$_id',
          courses: {
            $slice: [
              {
                $map: {
                  input: { $range: [0, { $size: '$courses' }] },
                  as: 'index',
                  in: {
                    $arrayElemAt: [
                      '$courses',
                      { $floor: { $multiply: [{ $rand: {} }, { $size: '$courses' }] } },
                    ],
                  },
                },
              },
              5, // 限制最多 5 个随机值
            ],
          },
        },
      },
    ]);

    const [tagNames] = await this.courseTagModel.aggregate([
      { $sample: { size: 30 } },
      {
        $group: {
          _id: null,
          tagNames: { $push: '$name' },
        },
      },
      {
        $project: {
          _id: 0,
          tagNames: 1,
        },
      },
    ]);

    return { carousel, popular, tagNames: tagNames.tagNames };
  }
  //#endregion getIndexAsync [ 首頁 ]

  //#region getSearchCoursesAsync [ 搜尋關鍵字 - 相關課程 ]
  /** 搜尋關鍵字 - 相關課程 */
  async getSearchCoursesAsync(q: string) {
    const currentDate = new Date();

    const [courses] = await this.courseHierarchyModel.aggregate<HomeSearchCoursesDto>([
      {
        $match: {
          $and: [
            { isPublished: true }, // 判斷已上架
            {
              $or: [
                {
                  title: { $regex: q, $options: 'i' },
                },
                {
                  tagNames: {
                    $elemMatch: {
                      $regex: q,
                      $options: 'i',
                    },
                  },
                },
              ],
            },
          ],
        },
      },
      { $sample: { size: 100 } },
      {
        $unwind: '$tagNames', // 展开 uniqueTagNames 字段
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
        $group: {
          _id: null,
          courses: {
            $push: {
              _id: '$_id',
              title: '$title',
              shortDescription: '$shortDescription',
              cover: { $concat: [this.coverUrl, '$cover', this.coverParamsUrl] },
              level: {
                $switch: {
                  branches: Object.entries(LevelEnum).map(([level, levelName]) => ({
                    case: { $eq: ['$level', parseInt(level)] },
                    then: levelName,
                  })),
                  default: null,
                },
              },
              time: '$totalTime',
              total: '$totalNumber',
              instructorName: { $arrayElemAt: ['$user.name', 0] },
              price: '$price',
              discountPrice: {
                $cond: [
                  {
                    $and: [
                      { $ifNull: ['$discountDate', false] }, // 判斷特價日期不為空
                      { $gte: ['$discountDate', currentDate] }, // 判斷特價日期大於等於今天
                    ],
                  },
                  '$discountPrice',
                  null,
                ],
              },
              isFree: '$isFree',
            },
          },
          uniqueTagNames: { $addToSet: '$tagNames' },
        },
      },
      {
        $project: {
          _id: 0, // 排除 _id 欄位
        },
      },
    ]);

    return courses;
  }
  //#endregion getSearchCoursesAsync [ 搜尋關鍵字 - 相關課程 ]

  //#region getSearchComboPackAsync [ 搜尋關鍵字 - 組合包 ]
  async getSearchComboPackAsync(tagNameArr: string[]) {
    const currentDate = new Date();

    const [comboPack] = await this.courseHierarchyModel.aggregate([
      {
        $match: {
          $and: [
            { isPublished: true, isPopular: true, tagNames: { $in: tagNameArr } }, // 判斷已 上架 且 為熱門課程
          ],
        },
      },
      {
        $sample: { size: 3 }, // 隨機讀取10筆
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
        $group: {
          _id: null,
          totalPrice: {
            $sum: {
              $cond: [
                {
                  $eq: ['$isFree', true], // 判斷免費課程
                },
                0,
                {
                  $cond: [
                    {
                      $and: [
                        { $ifNull: ['$discountDate', false] }, // 判斷特價日期不為空
                        { $gte: ['$discountDate', currentDate] }, // 判斷特價日期大於等於今天
                      ],
                    },
                    '$discountPrice',
                    '$price',
                  ],
                },
              ],
            },
          },
          courses: {
            $push: {
              _id: '$_id',
              title: '$title',
              shortDescription: '$shortDescription',
              cover: { $concat: [this.coverUrl, '$cover', this.coverParamsUrl] },
              level: {
                $switch: {
                  branches: Object.entries(LevelEnum).map(([level, levelName]) => ({
                    case: { $eq: ['$level', parseInt(level)] },
                    then: levelName,
                  })),
                  default: null,
                },
              },
              time: '$totalTime',
              total: '$totalNumber',
              instructorName: { $arrayElemAt: ['$user.name', 0] },
              price: '$price',
              discountPrice: {
                $cond: [
                  {
                    $and: [
                      { $ifNull: ['$discountDate', false] }, // 判斷特價日期不為空
                      { $gte: ['$discountDate', currentDate] }, // 判斷特價日期大於等於今天
                    ],
                  },
                  '$discountPrice',
                  null,
                ],
              },
              isFree: '$isFree',
            },
          },
        },
      },
      {
        $project: {
          _id: 0, // 排除 _id 欄位
        },
      },
    ]);

    const [courseCards] = await this.courseHierarchyModel.aggregate([
      {
        $match: {
          $and: [
            {
              isPublished: true,
              discountDate: { $ne: null, $gte: currentDate },
              tagNames: { $in: tagNameArr },
            }, // 判斷已上架且為特價課程
          ],
        },
      },
      {
        $sample: { size: 10 }, // 隨機讀取10筆
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
        $group: {
          _id: null,
          courses: {
            $push: {
              _id: '$_id',
              title: '$title',
              cover: { $concat: [this.coverUrl, '$cover', this.coverParamsUrl] },
              level: {
                $switch: {
                  branches: Object.entries(LevelEnum).map(([level, levelName]) => ({
                    case: { $eq: ['$level', parseInt(level)] },
                    then: levelName,
                  })),
                  default: null,
                },
              },
              time: '$totalTime',
              total: '$totalNumber',
              instructorName: { $arrayElemAt: ['$user.name', 0] },
              price: '$price',
              discountPrice: '$discountPrice',
              isFree: '$isFree',
            },
          },
        },
      },
      {
        $project: {
          _id: 0, // 排除 _id 欄位
        },
      },
    ]);

    return { comboPack, courseCards };
  }
  //#endregion getSearchComboPackAsync [ 搜尋關鍵字 - 組合包 ]

  //#region getVisitorCourseDetailsAsync [ 訪客 課程介紹 ]
  async getVisitorCourseDetailsAsync(courseId: string) {
    const currentDate = new Date();
    const _courseId = new Types.ObjectId(courseId);
    const [course] = await this.courseHierarchyModel.aggregate([
      {
        $match: {
          $and: [{ isPublished: true }, { _id: _courseId }],
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
        $project: {
          _id: 0, // 排除 _id 欄位
          userId: '$user._id',
          name: '$user.name',
          cover: { $concat: [this.coverUrl, '$cover', this.coverParamsUrl] },
          courseIntroduction: '$description',
          instructors: '$user.instructors',
          title: '$title',
          shelfDate: '$shelfDate',
          price: '$price',
          discountPrice: {
            $cond: [
              {
                $and: [
                  { $ifNull: ['$discountDate', false] }, // 判斷特價日期不為空
                  { $gte: ['$discountDate', currentDate] }, // 判斷特價日期大於等於今天
                ],
              },
              '$discountPrice',
              null,
            ],
          },
          isFree: '$isFree',
          chapters: {
            $map: {
              input: '$chapters',
              as: 'chapter',
              in: {
                _id: '$$chapter._id',
                sequence: '$$chapter.sequence',
                title: '$$chapter.title',
                time: '$$chapter.totalTime',
                total: '$$chapter.totalNumber',
                subchapters: {
                  $map: {
                    input: '$$chapter.subchapters',
                    as: 'subchapter',
                    in: {
                      _id: '$$subchapter._id',
                      sequence: '$$subchapter.sequence',
                      title: '$$subchapter.title',
                      time: '$$subchapter.time',
                      fileName: '$$subchapter.fileName',
                    },
                  },
                },
              },
            },
          },
        },
      },
    ]);

    if (!course) return 0;

    const lecturerRelatedCourses = await this.getLecturerRelatedCoursesAsync(
      course.userId,
      _courseId,
    );

    delete course.userId;

    return { course: course, lecturerRelatedCourses };
  }
  //#endregion getVisitorCourseDetailsAsync [ 訪客 課程介紹 ]

  //#region getLecturerRelatedCoursesAsync [ 講師相關課程 ]
  async getLecturerRelatedCoursesAsync(userId: Types.ObjectId, courseId: Types.ObjectId) {
    const lecturerRelatedCourses = await this.courseHierarchyModel.aggregate([
      {
        $match: {
          $and: [{ isPublished: true }, { user: userId }, { _id: { $ne: courseId } }],
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
        $project: {
          _id: 1,
          cover: { $concat: [this.coverUrl, '$cover', this.coverParamsUrl] },
          title: '$title',
        },
      },
    ]);

    return lecturerRelatedCourses;
  }
  //#endregion getLecturerRelatedCoursesAsync [ 講師相關課程 ]
}
