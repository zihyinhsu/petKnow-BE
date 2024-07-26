import { HttpMessage } from '@config/enums/http.enum';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeSearchDto } from './input/home-search.dto';
import { ValidateObjectIdPipe } from 'core/pipes/validate.pipe';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('基本頁面')
@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  //#region getIndex [ 首頁 ]
  /** 首頁 */
  @Get()
  @ApiOperation({ summary: '首頁' })
  async getIndex() {
    const { carousel, popular, tagNames } = await this.homeService.getIndexAsync();

    if (!carousel || popular.length === 0) return HttpMessage.BadRequest;

    return {
      ...carousel,
      popular,
      tagNames,
    };
  }
  //#endregion getIndex [ 首頁 ]

  //#region getSearch [ 搜尋關鍵字 ]
  /** 搜尋關鍵字 */
  @Get('/search')
  @ApiOperation({ summary: '搜尋關鍵字' })
  async getSearch(@Query() query: HomeSearchDto) {
    const courses = await this.homeService.getSearchCoursesAsync(query.q);
    const tagNames = courses.uniqueTagNames;

    if (!courses || !tagNames) return;

    delete courses.uniqueTagNames;

    const { comboPack, courseCards } = await this.homeService.getSearchComboPackAsync(tagNames);

    return {
      ...courses,
      comboPack,
      courseCards,
      tagNames,
    };
  }
  //#endregion getSearch [ 搜尋關鍵字 ]

  //#region getVisitorCourseDetails [ 訪客 課程介紹 ]
  /** 訪客 課程介紹 */
  @Get('/:courseId')
  @ApiOperation({ summary: '訪客 課程介紹' })
  async getVisitorCourseDetails(@Param('courseId', ValidateObjectIdPipe) courseId: string) {
    const result = await this.homeService.getVisitorCourseDetailsAsync(courseId);

    if (result === 0) return HttpMessage.NotFound;

    return result;
  }
  //#endregion getVisitorCourseDetails [ 訪客 課程介紹 ]
}
