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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('課程')
@ApiCreatedResponse({ description: '新增成功' })
@ApiOkResponse({
  description: '成功',
  schema: {
    example: {
      statusCode: 200,
      isSuccess: true,
      message: '成功',
    },
    properties: {
      statusCode: { type: 'number' },
      isSuccess: { type: 'boolean' },
      message: { type: 'string' },
    },
  },
})
@ApiBadRequestResponse({
  description: '錯誤的請求',
  schema: {
    example: {
      statusCode: 400,
      isSuccess: false,
      message: '錯誤的請求',
    },
    properties: {
      statusCode: { type: 'number' },
      isSuccess: { type: 'boolean' },
      message: { type: 'string' },
    },
  },
})
@ApiInternalServerErrorResponse({
  description: '伺服器發生錯誤',
  schema: {
    example: {
      statusCode: 500,
      isSuccess: false,
      message: '系統發生錯誤，請聯繫系統管理員',
    },
    properties: {
      statusCode: { type: 'number' },
      isSuccess: { type: 'boolean' },
      message: { type: 'string' },
    },
  },
})
@Controller('courses')
export class CoursesController {
  constructor(private courseService: CoursesService) {}

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
    return this.courseService.create(courseData, req.user);
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
