import { IQuery } from '@/interfaces/query.interface';
import { BaseService } from '@/lib/base.service';
import { School } from '@/entities/school.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSchoolDto as C } from './dto/create-school.dto';
import { UpdateSchoolDto as U } from './dto/update-school.dto';
import { QuerySchoolDto as Q } from './dto/query-school.dto';

@Injectable()
export class SchoolsService extends BaseService<School, C, U, Q> {
  constructor(
    @InjectRepository(School)
    private readonly schoolRepository: Repository<School>
  ) {
    super(schoolRepository);
  }

  async findAll(params: Q): Promise<IQuery<School>> {
    const { name, page, limit, take, skip } = params;
    let repository = await this.repository.createQueryBuilder('school');

    if (name) {
      repository = repository.where('name like :name', { name: `%${name}%` });
    }

    const totalCount = await repository.getCount();
    const records = await repository
      .orderBy('id', 'DESC')
      .take(take)
      .skip(skip)
      .getMany();
    const paginate = { page, limit, totalCount };

    return { records, paginate };
  }
}
