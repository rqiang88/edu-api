import { IQuery } from '@/core/interfaces/query.interface';
import { ApiProperty } from '@nestjs/swagger';

export class QueryDepartmentDto extends IQuery {
  @ApiProperty()
  name: string;

  @ApiProperty()
  state: string;
}
