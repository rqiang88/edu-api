import { IPaginate } from '@/interfaces/paginate.interface';
import { PartialType } from '@nestjs/mapped-types';

export class QueryStudentInfoDto extends PartialType(IPaginate) {
  readonly studentId: number;
  readonly state: string;
}
