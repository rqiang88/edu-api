import { IObject } from '@/core/interfaces/response.interface';
import { Department } from '@/entities/department.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDepartmentDto as C } from './dto/create-department.dto';
import { UpdateDepartmentDto as U } from './dto/update-department.dto';
import { QueryDepartmentDto as Q } from './dto/query-department.dto';
import { IQueryResult } from '@/core/interfaces/query-result.interface';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly repository: Repository<Department>
  ) {}

  async create(createDepartmentDto: C): Promise<Department> {
    const entity = this.repository.create(createDepartmentDto);
    return this.repository.save(entity);
  }

  async findAll(
    queryDepartmentDto: Partial<Q>
  ): Promise<IQueryResult<Department>> {
    const { name, skip, page, take, limit } = queryDepartmentDto;
    const builder = this.repository.createQueryBuilder('department');
    if (!!name) {
      builder.where('name like :name', { name: `%${name}%` });
    }
    const total = await builder.getCount();
    const data = await builder.skip(skip).take(take).getMany();
    const paginate = { total, page, limit };
    return { data, paginate };
  }

  async findOne(id: number): Promise<Department> {
    return await this.repository.findOneByOrFail({ id });
  }

  async update(id: number, updateDepartmentDto: U): Promise<Department> {
    await this.repository.update(id, updateDepartmentDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<IObject> {
    await this.repository.softDelete(id);
    return { message: 'success' };
  }
}
