import { CourseTag } from '@data/schema/courseTag.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CrudService<T> {
  private model: Model<T>; // 当前使用的模型

  constructor(@InjectModel(CourseTag.name) private readonly courseTagModel: Model<T>) {}

  private checkModel() {
    if (!this.model) {
      throw new Error('Model is not initialized. Call initModel() first.');
    }
  }

  // 设置当前使用的模型
  initModel(modelName: string): void {
    switch (modelName) {
      case CourseTag.name:
        this.model = this.courseTagModel;
        break;
      default:
        throw new Error(`Model '${modelName}' not found`);
    }
  }

  async findAll(isLean = true) {
    this.checkModel();

    if (isLean) return await this.model.find().lean().exec();

    return await this.model.find().exec();
  }

  async findById(id: string, isLean = true) {
    this.checkModel();

    if (isLean) return await this.model.findById(id).lean().exec();

    return await this.model.findById(id).exec();
  }

  async create(createDto: Partial<T>) {
    this.checkModel();
    const createdItem = await new this.model(createDto);

    return createdItem.save();
  }

  async update(id: string, updateDto: Partial<T>) {
    this.checkModel();
    return await this.model.findByIdAndUpdate(id, updateDto, { new: true }).exec();
  }

  async delete(id: string) {
    this.checkModel();
    const result = await this.model.findByIdAndDelete(id).exec();
    return result !== null;
  }
}
