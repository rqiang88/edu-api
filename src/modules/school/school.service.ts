import { QueueService } from './../../shared/queue/queue.service';
import { IQueryResult } from '@/core/interfaces/query-result.interface';
import { School } from '@/entities/school.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSchoolDto as C } from './dto/create-school.dto';
import { UpdateSchoolDto as U } from './dto/update-school.dto';
import { QuerySchoolDto as Q } from './dto/query-school.dto';
import { IObject } from '@/core/interfaces/response.interface';

@Injectable()
export class SchoolService {
  constructor(
    @InjectRepository(School)
    private readonly repository: Repository<School>,
    private readonly queueService: QueueService
  ) {}

  async findAll(querySchoolDto: Partial<Q>): Promise<IQueryResult<School>> {
    await this.queueService.add();
    const { name, skip, page, take, limit } = querySchoolDto;
    const builder = this.repository.createQueryBuilder('school');
    if (!!name) {
      builder.where('name like :name', { name: `%${name}%` });
    }
    const total = await builder.getCount();
    const data = await builder.skip(skip).take(take).getMany();
    const paginate = { total, page, limit };
    return { data, paginate };
  }

  async create(createSchoolDto: C): Promise<School> {
    const entity = this.repository.create(createSchoolDto);
    return await this.repository.save(entity);
  }

  async findOne(id: number): Promise<School> {
    return await this.repository.findOneByOrFail({ id });
  }

  async update(id: number, updateSchoolDto: U): Promise<School> {
    await this.repository.update(id, updateSchoolDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<IObject> {
    await this.repository.softDelete(id);
    return { message: 'success' };
  }
}
