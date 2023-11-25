import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  UseGuards,
  Query,
  Req,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Courses } from './dto/courses.entity';
import { courseDto } from './dto/course.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('課程')
@Controller('courses')
export class CoursesController {
  constructor(private courseService: CoursesService) {}

  // 取得單筆程資料
  // @ApiOperation({ summary: '取得單筆課程資料' })
  // @Get('/:id')
  // async find(@Param('id') id: string) {
  //   const course = await this.courseService.findOne(id);
  //   if (!course) {
  //     throw new NotFoundException('找不到該資料');
  //   }
  //   return course;
  // }

  // 搜尋所有課程
  @ApiOperation({ summary: '搜尋所有課程' })
  @Get()
  async search(
    @Query('filter') filter: string,
    @Query('rowsPerPage') rowsPerPage: string,
    @Query('page') page: string,
  ): Promise<Courses[]> {
    return this.courseService.find({
      filter,
      rowsPerPage,
      page,
    });
  }

  // 搜尋我開的課
  @ApiOperation({ summary: '我開的課' })
  @Get('/personal')
  @UseGuards(AuthGuard('jwt')) //代表此 API 需要有權限才能打
  async findCreatedCourses(
    @Query('filter') filter: string,
    @Query('rowsPerPage') rowsPerPage: string,
    @Query('page') page: string,
    @Req() req,
  ): Promise<Courses[]> {
    return this.courseService.findCreatedCourses({
      filter,
      rowsPerPage,
      page,
      ownerId: req.user._id,
    });
  }

  // 新增單筆課程
  @ApiOperation({ summary: '新增單筆課程' })
  @Post()
  @UseGuards(AuthGuard('jwt')) //代表此 API 需要有權限才能打
  async create(
    @Body()
    courseData: courseDto,
    @Req() req,
  ) {
    const course = await this.courseService.create(courseData, req.user);
    let message = '新增失敗';
    let statusCode = 404;
    if (course) {
      message = '新增成功';
      statusCode = 200;
    }
    return {
      status: statusCode,
      message,
      data: course,
    };
  }
  // 更新單筆課程
  @ApiOperation({ summary: '更新單筆課程' })
  @Patch('/:id')
  @UseGuards(AuthGuard('jwt')) //代表此 API 需要有權限才能打
  update(@Param('id') id: string, @Body() body: courseDto) {
    return this.courseService.update(id, body);
  }
  // 刪除單筆課程
  @ApiOperation({ summary: '刪除單筆課程' })
  @Delete('/:id')
  @UseGuards(AuthGuard('jwt')) //代表此 API 需要有權限才能打
  remove(@Param('id') id: string) {
    return this.courseService.remove(id);
  }
}
