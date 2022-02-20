import { IPaginate } from '@/interfaces/paginate.interface';
import { PartialType } from '@nestjs/mapped-types';

export class QueryDepartmentDto extends PartialType(IPaginate) {
  readonly name: string;
  readonly state: string;
}
