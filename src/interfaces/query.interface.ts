import { IPaginate } from './paginate.interface';

export class IQuery<T> {
  records: T[];
  paginate: Partial<IPaginate>;
}
