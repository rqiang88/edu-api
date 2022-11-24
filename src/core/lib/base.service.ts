import { Injectable } from '@nestjs/common';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { IQueryResult } from '../interfaces/query-result.interface';
import { IQuery } from '../interfaces/query.interface';
import { IObject } from '../interfaces/response.interface';

@Injectable()
export class BaseService<
  E = IObject,
  C extends DeepPartial<E> = E,
  U extends QueryDeepPartialEntity<E> = IObject,
  Q extends Partial<IQuery> = IObject
> {
  protected repository: Repository<E>;
  constructor(repository: Repository<E>) {
    this.repository = repository;
  }

  async findAll(params: Q): Promise<Partial<IQueryResult<E>>> {
    const { skip, take, page, limit } = params;
    const data = await this.repository.find({ take, skip });
    const total = await this.repository.count();
    const paginate = { page, limit, total };
    return { data, paginate };
  }

  async create(params: C): Promise<E> {
    const entity = await this.repository.create(params);
    const data = await this.repository.save(entity);
    return data;
  }

  async findOne(id: number): Promise<E> {
    const options: FindOptionsWhere<IObject> = { id };
    return await this.repository.findOneByOrFail(options);
  }

  async update(id: number, params: U): Promise<E> {
    await this.repository.update(id, params);
    return await this.findOne(id);
  }

  async remove(id: number) {
    await this.repository.softDelete(id);
    return { message: 'success' };
  }
}
