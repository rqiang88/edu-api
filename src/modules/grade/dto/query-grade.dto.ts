import { IQuery } from '@/core/interfaces/query.interface';
import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class QueryGradeDto extends PartialType(IQuery) {
  @ApiPropertyOptional()
  name: string;
}
