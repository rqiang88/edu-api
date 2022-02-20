import { IQuery } from '@/interfaces/query.interface';
import { IPaginate } from '@/interfaces/paginate.interface';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

type IObject = Record<string, any>;
type Paginate = Partial<IPaginate>;

@Injectable()
export class BaseService<E = IObject, C = E, U = E, Q extends Paginate = E> {
  protected repository: Repository<E>;
  constructor(repository: Repository<E>) {
    this.repository = repository;
  }

  async findAll(params: Q): Promise<Partial<IQuery<E>>> {
    const { skip, take, page, limit } = params;
    const records = await this.repository.find({ take, skip });
    const total = await this.repository.count();
    const paginate = { page, limit, total };
    return { records, paginate };
  }

  async create(params: C): Promise<E> {
    const entity = await this.repository.create(params);
    const data = await this.repository.save(entity);
    return data;
  }

  async findOne(id: number): Promise<E> {
    return await this.repository.findOneOrFail(id);
  }

  async update(id: number, params: U): Promise<E> {
    await this.repository.update(id, params);
    return await this.repository.findOneOrFail(id);
  }

  async remove(id: number) {
    await this.repository.delete(id);
    return { data: { status: 'success' } };
  }
}
