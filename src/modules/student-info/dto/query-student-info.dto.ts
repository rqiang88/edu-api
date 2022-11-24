import { IQuery } from '@/core/interfaces/query.interface';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class QueryStudentInfoDto extends PartialType(IQuery) {
  @ApiProperty()
  readonly studentId: number;

  @ApiProperty()
  readonly state: string;
}
