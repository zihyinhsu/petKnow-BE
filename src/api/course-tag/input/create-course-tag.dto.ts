import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCourseTagDTO {
  @ApiProperty({ description: '標籤的名稱', example: '狗狗品種' })
  @IsString()
  name: string;
}
