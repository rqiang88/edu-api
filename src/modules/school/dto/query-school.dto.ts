import { IQuery } from '@/core/interfaces/query.interface';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class QuerySchoolDto extends PartialType(IQuery) {
  @ApiPropertyOptional()
  name: string;

  @ApiProperty()
  shortName: string;
}
