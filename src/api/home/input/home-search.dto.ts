import { IsString, IsNotEmpty } from 'class-validator';

export class HomeSearchDto {
  @IsString()
  @IsNotEmpty()
  readonly q: string;
}
