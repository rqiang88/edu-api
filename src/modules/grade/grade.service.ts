import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGradeDto as C } from './dto/create-grade.dto';
import { UpdateGradeDto as U } from './dto/update-grade.dto';
import { QueryGradeDto as Q } from './dto/query-grade.dto';
import { Grade } from '@/entities/grade.entity';
import { IQueryResult } from '@/core/interfaces/query-result.interface';
import { IObject } from '@/core/interfaces/response.interface';

@Injectable()
export class GradeService {
  constructor(
    @InjectRepository(Grade)
    private readonly repository: Repository<Grade>
  ) {}

  async create(createGradeDto: C): Promise<Grade> {
    const entity = this.repository.create(createGradeDto);
    return await this.repository.save(entity);
  }

  async findAll(queryGradeDto: Partial<Q>): Promise<IQueryResult<Grade>> {
    const { name, skip, page, take, limit } = queryGradeDto;
    const builder = this.repository.createQueryBuilder('grade');
    if (!!name) builder.where('name like :name', { name: `%${name}%` });
    const total = await builder.getCount();
    const data = await builder.skip(skip).take(take).getMany();
    const paginate = { total, page, limit };
    return { data, paginate };
  }

  async findOne(id: number): Promise<Grade> {
    return this.repository.findOneByOrFail({ id });
  }

  async update(id: number, updateGradeDto: U): Promise<Grade> {
    await this.repository.update(id, updateGradeDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<IObject> {
    await this.repository.softDelete(id);
    return { message: 'success' };
  }
}
