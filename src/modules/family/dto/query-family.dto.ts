import { IQuery } from '@/core/interfaces/query.interface';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class QueryFamilyDto extends PartialType(IQuery) {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly mobile: string;

  @ApiProperty()
  readonly cardNo: string;
}
