import { IQuery } from '@/core/interfaces/query.interface';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class QueryTeacherDto extends PartialType(IQuery) {
  @ApiProperty()
  name: string;

  @ApiProperty()
  mobile: string;
}
