import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCourseTagDTO {
  @ApiProperty({ description: '標籤的名稱', required: false, example: '更新的標籤名稱' })
  @IsString()
  @IsOptional()
  name?: string;
}
