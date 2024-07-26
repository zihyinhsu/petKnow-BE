import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class HomeSearchDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '關鍵字', example: '貓咪' })
  readonly q: string;
}
