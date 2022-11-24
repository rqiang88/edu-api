import { IQuery } from '@/core/interfaces/query.interface';
import { PartialType } from '@nestjs/swagger';

export class QueryStudentDto extends PartialType(IQuery) {
  name: string;
}
