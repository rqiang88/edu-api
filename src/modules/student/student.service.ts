import { IObject } from '@/core/interfaces/response.interface';
import { Student } from '@/entities/student.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentDto as C } from './dto/create-student.dto';
import { UpdateStudentDto as U } from './dto/update-student.dto';
import { QueryStudentDto as Q } from './dto/query-student.dto';
import { Repository } from 'typeorm';
import { IQueryResult } from '@/core/interfaces/query-result.interface';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly repository: Repository<Student>
  ) {}

  async create(createStudentDto: C): Promise<Student> {
    const entity = this.repository.create(createStudentDto);
    return await this.repository.save(entity);
  }

  async findAll(queryStudentDto: Partial<Q>): Promise<IQueryResult<Student>> {
    const { name, skip, page, take, limit } = queryStudentDto;
    const builder = this.repository.createQueryBuilder('student');
    if (!!name) {
      builder.where('name like :name', { name: `%${name}%` });
    }
    const total = await builder.getCount();
    const data = await builder.skip(skip).take(take).getMany();
    const paginate = { total, page, limit };
    return { data, paginate };
  }

  async findOne(id: number): Promise<Student> {
    return await this.repository.findOneOrFail({ where: { id } });
  }

  async update(id: number, updateStudentDto: U): Promise<Student> {
    await this.repository.update(id, updateStudentDto);
    return await this.repository.findOneOrFail({ where: { id } });
  }

  async remove(id: number): Promise<IObject> {
    await this.repository.delete(id);
    return { message: 'success' };
  }
}
