import { Injectable, NotFoundException } from '@nestjs/common';
import { Courses } from './dto/courses.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { courseDto } from './dto/course.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class CoursesService {
  constructor(@InjectRepository(Courses) private repo: Repository<Courses>) {}

  create(createCourseDto: courseDto): Promise<Courses[]> {
    const data = Object.assign(createCourseDto);
    const course = this.repo.create(data);
    // 要先建立實例，entity listener 才會執行，如果沒建立實例，直接存物件
    // 如：this.repo.save（{email,password,}） 就不會觸發 entity listener
    return this.repo.save(course);
  }

  // 取得特定資料
  async findOne(id): Promise<Courses> {
    if (!id) {
      return null;
    }
    const course = await this.repo.findOneBy({
      _id: new ObjectId(id),
    });
    return course;
  }
  // 取得符合條件的資料列表
  async find(query): Promise<any> {
    // 分頁
    const resPerPage = Number(query.resPerPage) || 0; // 一頁有幾筆資料
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const keyword = query.filter
      ? {
          title: {
            $regex: query.filter, // MongoDB查詢操作符
            $options: 'i', // 是正则表达式选项，'i' 表示不区分大小写，这意味着搜索将不区分关键词的大小写。
          },
        }
      : {};

    const [data, total] = await this.repo.findAndCount({
      where: keyword as FindOptionsWhere<Courses>[],
      skip: skip,
      take: resPerPage,
    });
    return { data, total };
  }
  // 簡單說Partial 幫你複製了一份 Type ，然後把裡頭的 property 設為 optional ，也就是可有可無
  async update(id: ObjectId, attrs: Partial<Courses>): Promise<Courses> {
    const course = await this.repo.findOneBy({
      _id: new ObjectId(id),
    });
    if (!course) {
      throw new NotFoundException('找不到該課程');
    }

    const updateResult = await this.repo.save({ ...course, ...attrs });
    return updateResult;
  }
  async remove(id: ObjectId): Promise<Courses> {
    const course = await this.repo.findOneBy({
      _id: new ObjectId(id),
    });
    if (!course) {
      throw new NotFoundException('找不到該課程');
    }
    const result = this.repo.remove(course);
    return result;
  }
}
