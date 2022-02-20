import { StudentInfo } from '@/entities/student-info.entity';
import { BaseService } from '@/lib/base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentInfoDto as C } from './dto/create-student-info.dto';
import { UpdateStudentInfoDto as U } from './dto/update-student-info.dto';
import { QueryStudentInfoDto as Q } from './dto/query-student-info.dto';
import { IQuery } from '@/interfaces/query.interface';

@Injectable()
export class StudentInfosService extends BaseService<StudentInfo, C, U, Q> {
  constructor(
    @InjectRepository(StudentInfo)
    private readonly studentInfoRepository: Repository<StudentInfo>
  ) {
    super(studentInfoRepository);
  }

  async findAll(params: Q): Promise<IQuery<StudentInfo>> {
    const { studentId, page, limit, take, skip } = params;
    let repository = await this.repository.createQueryBuilder('sinfo');

    if (studentId) {
      repository = repository.where('sinfo.student_id = :studentId', {
        studentId
      });
    }

    const totalCount = await repository.getCount();
    const records = await repository
      .leftJoinAndSelect('sinfo.grade', 'grade')
      .orderBy('sinfo.id', 'DESC')
      .take(take)
      .skip(skip)
      .getMany();
    const paginate = { page, limit, totalCount };

    return { records, paginate };
  }

  async create(params: C): Promise<StudentInfo> {
    const entity = await this.repository.create(params);
    const data = await this.repository.save(entity);
    return this.repository.findOneOrFail(data.id, { relations: ['grade'] });
  }
}
