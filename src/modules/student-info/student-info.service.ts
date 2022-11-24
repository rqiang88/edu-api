import { Injectable } from '@nestjs/common';
import { CreateStudentInfoDto as C } from './dto/create-student-info.dto';
import { UpdateStudentInfoDto as U } from './dto/update-student-info.dto';
import { QueryStudentInfoDto as Q } from './dto/query-student-info.dto';
import { StudentInfo } from '@/entities/student-info.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IQueryResult } from '@/core/interfaces/query-result.interface';
import { IObject } from '@/core/interfaces/response.interface';

@Injectable()
export class StudentInfoService {
  constructor(
    @InjectRepository(StudentInfo)
    private readonly repository: Repository<StudentInfo>
  ) {}
  async findAll(
    queryStudentInfoDto: Partial<Q>
  ): Promise<IQueryResult<StudentInfo>> {
    const { studentId, skip, page, take, limit } = queryStudentInfoDto;
    const builder = this.repository.createQueryBuilder('student_info');
    if (!!studentId) {
      builder.where('studentId = ?', { studentId });
    }
    const total = await builder.getCount();
    const data = await builder.skip(skip).take(take).getMany();
    const paginate = { total, page, limit };
    return { data, paginate };
  }

  async create(createSchoolDto: C): Promise<StudentInfo> {
    const entity = this.repository.create(createSchoolDto);
    return await this.repository.save(entity);
  }

  async findOne(id: number): Promise<StudentInfo> {
    return await this.repository.findOneByOrFail({ id });
  }

  async update(id: number, updateSchoolDto: U): Promise<StudentInfo> {
    await this.repository.update(id, updateSchoolDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<IObject> {
    await this.repository.softDelete(id);
    return { message: 'success' };
  }
}
