import { IPaginate } from '@/interfaces/paginate.interface';
import { PartialType } from '@nestjs/mapped-types';

export class QueryFamilyDto extends PartialType(IPaginate) {
  readonly name: string;
  readonly mobile: string;
  readonly cardNo: string;
}
