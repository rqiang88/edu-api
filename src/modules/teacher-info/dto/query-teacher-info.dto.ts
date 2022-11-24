import { IQuery } from '@/core/interfaces/query.interface';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class QueryTeacherInfoDto extends PartialType(IQuery) {
  @ApiProperty()
  readonly teacherId: number;

  @ApiProperty()
  readonly state: string;
}
