import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CourseTagService } from './course-tag.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CourseTagFindNamesDTO } from './input/find-name-course-tag.dto';
import { CreateCourseTagDTO } from './input/create-course-tag.dto';
import { CourseTag } from '@data/schema/courseTag.schema';
import { UpdateCourseTagDTO } from './input/update-course-tag.dto';

// TODO: 是否需要加上身分權限的驗證
@ApiTags('標籤資料表')
@Controller('course-tag')
export class CourseTagController {
  constructor(private readonly courseTagService: CourseTagService) {}

  @ApiOperation({
    summary: '標籤資料表 - 模糊查詢標籤',
    description: '根據傳入的名稱參數，查詢並傳回包含該名稱的標籤名稱。最多回傳100條結果。 ',
  })
  @Get()
  async getCourseTagFindNames(@Query() queryDTO: CourseTagFindNamesDTO) {
    return this.courseTagService.getFindNames(queryDTO.name);
  }

  @ApiOperation({ summary: '標籤資料表 - 新增標籤' })
  @Post()
  async createCourseTag(@Body() createDto: CreateCourseTagDTO): Promise<CourseTag> {
    return this.courseTagService.create(createDto);
  }

  @ApiOperation({ summary: '標籤資料表 - 查詢特定標籤' })
  @Get(':id')
  async getCourseTagById(@Param('id') id: string): Promise<CourseTag> {
    return this.courseTagService.findById(id);
  }

  @ApiOperation({ summary: '標籤資料表 - 更新標籤' })
  @Put(':id')
  async updateCourseTag(
    @Param('id') id: string,
    @Body() updateDto: UpdateCourseTagDTO,
  ): Promise<CourseTag> {
    return this.courseTagService.update(id, updateDto);
  }

  @ApiOperation({ summary: '標籤資料表 - 刪除標籤' })
  @Delete(':id')
  async deleteCourseTag(@Param('id') id: string): Promise<boolean> {
    return this.courseTagService.delete(id);
  }
}
