import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CourseTagFindNamesDTO {
  @ApiProperty({ description: '要搜索的標籤名稱', example: '狗狗', required: false })
  @IsString()
  name: string;
}
