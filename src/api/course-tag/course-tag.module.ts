import { Module } from '@nestjs/common';
import { CourseTagService } from './course-tag.service';
import { CourseTagController } from './course-tag.controller';
import { CrudModule } from '@app/crud/crud.module';
import { DatabaseModule } from '@data/database.module';

@Module({
  imports: [CrudModule, DatabaseModule],
  providers: [CourseTagService],
  controllers: [CourseTagController],
})
export class CourseTagModule {}
