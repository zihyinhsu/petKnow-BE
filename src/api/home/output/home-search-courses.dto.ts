import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

class Course {
  _id: string;
  title: string;
  cover: string;
  level: string | null;
  time: number;
  total: number;
  instructorName: string;
  price: number;
  discountPrice: number | null;
  isFree: boolean;
}

export class HomeSearchCoursesDto {
  @ApiProperty({ description: '課程資訊' })
  @IsNotEmpty()
  @IsArray()
  courses: Course[];

  @ApiProperty({ description: '標籤名稱' })
  @IsArray()
  uniqueTagNames?: string[];
}
