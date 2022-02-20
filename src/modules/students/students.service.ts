import { Student } from '@/entities/student.entity';
import { BaseService } from '@/lib/base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDto as C } from './dto/create-student.dto';
import { UpdateStudentDto as U } from './dto/update-student.dto';

@Injectable()
export class StudentsService extends BaseService<Student, C, U> {
  constructor(
    @InjectRepository(Student)
    private readonly studentServices: Repository<Student>
  ) {
    super(studentServices);
  }

  async findOne(id: number): Promise<Student> {
    return await this.repository.findOneOrFail(id, { relations: ['families'] });
  }
}
