import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GoldFlowCourseDto {
  @ApiProperty({ description: '課程 Id', example: '60b8d295f1d3b31f4c8d7e34' })
  @IsString()
  courseId: string;
}
