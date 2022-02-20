import { Family } from '@/entities/family.entity';
import { IQuery } from '@/interfaces/query.interface';
import { BaseService } from '@/lib/base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFamilyDto as C } from './dto/create-family.dto';
import { UpdateFamilyDto as U } from './dto/update-family.dto';
import { QueryFamilyDto as Q } from './dto/query-family.dto';
import { Student } from '@/entities/student.entity';

@Injectable()
export class FamiliesService extends BaseService<Family, C, U, Q> {
  constructor(
    @InjectRepository(Family)
    private readonly familyRepository: Repository<Family>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>
  ) {
    super(familyRepository);
  }

  async findAll(params: Q): Promise<Partial<IQuery<Family>>> {
    const { name, page, limit, take, skip } = params;
    let repository = this.familyRepository.createQueryBuilder('family');

    if (name) {
      repository = repository.where('name like ?', { name: `%${name}%` });
    }

    const total = await repository.getCount();
    const records = await repository.take(take).skip(skip).getMany();
    const paginate = { page, limit, total };

    return { records, paginate };
  }

  async create(params: C): Promise<Family> {
    const { studentId } = params;
    Reflect.deleteProperty(params, 'schoolId');
    const entity = await this.repository.create(params);
    if (studentId) {
      const student = await this.studentRepository.findOneOrFail(studentId);
      Object.assign(entity, { students: [student] });
    }
    const data = await this.repository.save(entity);
    return data;
  }
}
