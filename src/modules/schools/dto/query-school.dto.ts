import { IPaginate } from '@/interfaces/paginate.interface';
import { PartialType } from '@nestjs/mapped-types';

export class QuerySchoolDto extends PartialType(IPaginate) {
  readonly state: string;
  readonly name: string;
  readonly shortName: string;
}
