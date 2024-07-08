import { CourseTag } from '@data/schema/courseTag.schema';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CourseTagResultDTO } from './output/course-tag.dto';
import { CreateCourseTagDTO } from './input/create-course-tag.dto';
import { UpdateCourseTagDTO } from './input/update-course-tag.dto';

@Injectable()
export class CourseTagService {
  constructor(@InjectModel(CourseTag.name) private readonly courseTagModel: Model<CourseTag>) {}

  async getFindNames(name: string): Promise<CourseTagResultDTO[]> {
    const result = await this.courseTagModel
      .find({ name: new RegExp(name, 'i') })
      .select('name')
      .limit(100)
      .lean()
      .exec();

    const model = result.map(tag => ({
      ...tag,
      _id: tag._id.toString(),
    }));

    return model;
  }

  async create(createDto: CreateCourseTagDTO): Promise<CourseTag> {
    const isExistingTag = await this.courseTagModel.findOne({ name: createDto.name }).exec();

    if (isExistingTag) {
      throw new BadRequestException('具有該名稱的標籤已存在');
    }

    const createdTag = new this.courseTagModel(createDto);
    return createdTag.save();
  }

  async findById(id: string): Promise<CourseTag> {
    return this.courseTagModel.findById(id).lean().exec();
  }

  async update(id: string, updateDto: UpdateCourseTagDTO): Promise<CourseTag> {
    return this.courseTagModel.findByIdAndUpdate(id, updateDto, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.courseTagModel.findByIdAndDelete(id).exec();
    return result !== null;
  }
}
