import { StudentFamily } from '@/entities/student-family.entity';
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
    @InjectRepository(StudentFamily)
    private readonly studentFamilyRepository: Repository<StudentFamily>,
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
    Reflect.deleteProperty(params, 'studentId');
    const entity = await this.repository.create(params);
    const data = await this.repository.save(entity);
    if (studentId) {
      const studentFamily = await this.studentFamilyRepository.create({
        studentId,
        family: data
      });
      await this.studentFamilyRepository.save(studentFamily);
    }
    return data;
  }

  async findOne(id: number): Promise<Family> {
    const data = await this.repository.findOneOrFail(id);
    const students = await this.getStudents(id);
    Object.assign(data, { students });
    return data;
  }

  async getStudents(id: number): Promise<Student[]> {
    const { studentFamilies } = await this.repository.findOneOrFail(id, {
      relations: ['studentFamilies']
    });
    const studentIds = studentFamilies.filter(s => s.studentId);
    return await this.studentRepository.findByIds(studentIds);
  }
}
