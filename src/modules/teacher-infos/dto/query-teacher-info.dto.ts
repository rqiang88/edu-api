import { IPaginate } from '@/interfaces/paginate.interface';
import { PartialType } from '@nestjs/mapped-types';

export class QueryTeacherInfoDto extends PartialType(IPaginate) {
  readonly teacherId: number;
  readonly state: string;
}
