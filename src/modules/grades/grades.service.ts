import { Grade } from '@/entities/grade.entity';
import { BaseService } from '@/lib/base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGradeDto as C } from './dto/create-grade.dto';
import { UpdateGradeDto as U } from './dto/update-grade.dto';
import { QueryGradeDto as Q } from './dto/query-grade.dto';

@Injectable()
export class GradesService extends BaseService<Grade, C, U, Q> {
  constructor(
    @InjectRepository(Grade)
    private readonly gradeRepository
  ) {
    super(gradeRepository);
  }

  async getStudents(gradeId: number) {
    const grade = await this.repository.findOneOrFail(gradeId, {
      relations: ['students']
    });
    console.log(grade);
    // return grade.students;
  }
}
