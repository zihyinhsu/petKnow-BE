import { ApiProperty } from '@nestjs/swagger';

export class CourseTagResultDTO {
  @ApiProperty({ description: '標籤的唯一識別碼', example: '60b8d295f1d3b31f4c8d7e34' })
  _id: string;

  @ApiProperty({ description: '標籤的名稱', example: '狗狗品種' })
  name: string;
}
