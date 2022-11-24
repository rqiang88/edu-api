import { Teacher } from '@/entities/teacher.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTeacherDto as C } from './dto/create-teacher.dto';
import { UpdateTeacherDto as U } from './dto/update-teacher.dto';
import { QueryTeacherDto as Q } from './dto/query-teacher.dto';
import { IQueryResult } from '@/core/interfaces/query-result.interface';
import { IObject } from '@/core/interfaces/response.interface';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private readonly repository: Repository<Teacher>
  ) {}

  async findAll(queryTeacherDto: Partial<Q>): Promise<IQueryResult<Teacher>> {
    const { name, skip, page, take, limit } = queryTeacherDto;
    const builder = this.repository.createQueryBuilder('school');
    if (!!name) {
      builder.where('name like :name', { name: `%${name}%` });
    }
    const total = await builder.getCount();
    const data = await builder.skip(skip).take(take).getMany();
    const paginate = { total, page, limit };
    return { data, paginate };
  }

  async create(createTeacherDto: C): Promise<Teacher> {
    const entity = this.repository.create(createTeacherDto);
    const data = await this.repository.save(entity);
    return data;
  }

  async findOne(id: number): Promise<Teacher> {
    return await this.repository.findOneByOrFail({ id });
  }

  async update(id: number, updateTeacherDto: U): Promise<Teacher> {
    await this.repository.update(id, updateTeacherDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<IObject> {
    await this.repository.softDelete(id);
    return { message: 'success' };
  }
}
