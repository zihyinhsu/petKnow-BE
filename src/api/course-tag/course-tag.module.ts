import { Module } from '@nestjs/common';
import { CourseTagService } from './course-tag.service';
import { CourseTagController } from './course-tag.controller';
import { DatabaseModule } from '@data/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [CourseTagService],
  controllers: [CourseTagController],
})
export class CourseTagModule {}
