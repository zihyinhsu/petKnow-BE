import { CrudService } from '@app/crud/crud.service';
import { CourseTag } from '@data/schema/courseTag.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CourseTagService {
  constructor(private readonly crudService: CrudService<CourseTag>) {
    this.crudService.initModel(CourseTag.name);
  }

  async getAll() {
    return await this.crudService.findAll();
  }
}
