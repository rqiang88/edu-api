import { Grade } from '@/entities/grade.entity';
import { BaseService } from '@/lib/base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGradeDto as C } from './dto/create-grade.dto';
import { UpdateGradeDto as U } from './dto/update-grade.dto';
import { QueryGradeDto as Q } from './dto/query-grade.dto';
import { Student } from '@/entities/student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GradesService extends BaseService<Grade, C, U, Q> {
  constructor(
    @InjectRepository(Grade)
    private readonly gradeRepository: Repository<Grade>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>
  ) {
    super(gradeRepository);
  }

  async findOne(id: number): Promise<Grade> {
    const data = await this.repository.findOneOrFail(id);
    const students = await this.getStudents(id);
    Object.assign(data, { students });
    return data;
  }

  async getStudents(gradeId: number): Promise<Student[]> {
    return await this.studentRepository
      .createQueryBuilder('student')
      .leftJoinAndSelect('student.studentInfos', 's_info')
      .leftJoinAndSelect('s_info.grade', 'grade')
      .where('grade.id = :gradeId', { gradeId })
      .getMany();
  }
}
