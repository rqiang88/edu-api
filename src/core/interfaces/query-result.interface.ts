export interface IQueryResult<T> {
  data: T[];
  paginate: IPaginate;
}

interface IPaginate {
  total: number;
  page: number;
  limit: number;
}
