import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCourseHierarchysDto {
  @ApiProperty()
  @IsNotEmpty()
  user: string;
  @ApiProperty()
  tagNames: string[];
  @ApiProperty()
  cover: string;
  @ApiProperty()
  promoVideo: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  shortDescription: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  level: number;
  @ApiProperty()
  price: number;
  @ApiProperty()
  discountPrice: number;
  @ApiProperty()
  enrollmentCount: number;
  @ApiProperty()
  totalTime: number;
  @ApiProperty()
  totalNumber: number;
  @ApiProperty()
  isFree: boolean;
  @ApiProperty()
  isPublished: boolean;
  @ApiProperty()
  discountDate: string;
  @ApiProperty()
  shelfDate: string;
  @ApiProperty()
  createdAt: string;
  @ApiProperty()
  updatedAt: string;
  @ApiProperty()
  chapters: Chapter[];
}

export class Chapter {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  sequence: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  totalTime: number;
  @ApiProperty()
  totalNumber: number;
  @ApiProperty()
  subchapters: Subchapter[];
}

export class Subchapter {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  sequence: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  content: null;
  @ApiProperty()
  fileName: string;
  @ApiProperty()
  fileType: number;
  @ApiProperty()
  time: number;
}
