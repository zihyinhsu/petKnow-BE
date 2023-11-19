import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Patch,
  Query,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { ObjectId } from 'mongodb';
import { Courses } from './dto/courses.entity';
import { courseDto } from './dto/course.dto';
import { AuthGuard } from '@nestjs/passport';
// import { userDto } from 'src/users/dto/user.dto';

@Controller('courses')
export class CoursesController {
  constructor(private courseService: CoursesService) {}

  // 取得單一課程資料
  @Get('/:id')
  async find(@Param('id') id: ObjectId) {
    const course = await this.courseService.findOne(id);
    if (!course) {
      throw new NotFoundException('找不到該資料');
    }
    return course;
  }

  // 搜尋所有課程
  @Get()
  async search(@Query() query): Promise<Courses[]> {
    return this.courseService.find(query);
  }

  // 新增單筆課程
  @Post()
  @UseGuards(AuthGuard('jwt'))
  //   @UseGuards(AuthGuard()) //代表此 API 需要有權限才能打
  async create(
    @Body()
    courseData: courseDto,
  ) {
    const course = await this.courseService.create(courseData);
    let message = '新增失敗';
    let statusCode = 404;
    if (course) {
      message = '新增成功';
      statusCode = 200;
    }
    return {
      status: statusCode,
      message,
      course,
    };
  }
  // 更新單筆課程
  @Patch('/:id')
  update(@Param('id') id: ObjectId, @Body() body: courseDto) {
    return this.courseService.update(id, body);
  }
  // 刪除單筆課程
  @Delete('/:id')
  remove(@Param('id') id: ObjectId) {
    return this.courseService.remove(id);
  }
}
