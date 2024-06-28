import { Controller, Get } from '@nestjs/common';
import { CourseTagService } from './course-tag.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('標籤資料表')
@Controller('course-tag')
export class CourseTagController {
  constructor(private readonly courseTagService: CourseTagService) {}

  @ApiOperation({ summary: '標籤資料表 - 查詢所有資料' })
  @Get()
  async getCourseTagAll() {
    return this.courseTagService.getAll();
  }
}
