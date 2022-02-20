import { IPaginate } from '@/interfaces/paginate.interface';
import { PartialType } from '@nestjs/mapped-types';

export class QueryGradeDto extends PartialType(IPaginate) {
  readonly name: string;
}
