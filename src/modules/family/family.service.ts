import { Family } from '@/entities/family.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFamilyDto as C } from './dto/create-family.dto';
import { UpdateFamilyDto as U } from './dto/update-family.dto';
import { QueryFamilyDto as Q } from './dto/query-family.dto';
import { IQueryResult } from '@/core/interfaces/query-result.interface';
import { IObject } from '@/core/interfaces/response.interface';

@Injectable()
export class FamilyService {
  constructor(
    @InjectRepository(Family)
    private readonly repository: Repository<Family>
  ) {}

  async findAll(queryFamilyDto: Partial<Q>): Promise<IQueryResult<Family>> {
    const { name, page, limit, take, skip } = queryFamilyDto;
    const repository = this.repository.createQueryBuilder('family');

    if (name) {
      repository.where('name like :name', { name: `%${name}%` });
    }

    const total = await repository.getCount();
    const data = await repository.take(take).skip(skip).getMany();
    const paginate = { page, limit, total };

    return { data, paginate };
  }

  async create(createFamilyDto: C): Promise<Family> {
    const entity = this.repository.create(createFamilyDto);
    return await this.repository.save(entity);
  }

  async findOne(id: number): Promise<Family> {
    return await this.repository.findOneByOrFail({ id });
  }

  async update(id: number, updateSchoolDto: U): Promise<Family> {
    await this.repository.update(id, updateSchoolDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<IObject> {
    await this.repository.softDelete(id);
    return { message: 'success' };
  }
}
