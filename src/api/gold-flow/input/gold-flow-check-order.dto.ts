import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GoldFlowCheckOrderDto {
  @ApiProperty({ description: '訂單 id', example: '60b8d295f1d3b31f4c8d7e34' })
  @IsNotEmpty()
  @IsString()
  _id: string;
}
