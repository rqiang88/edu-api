import { Family } from '@/entities/family.entity';
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
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Family)
    private readonly familyRepository: Repository<Family>
  ) {
    super(studentRepository);
  }

  async findOne(id: number): Promise<Student> {
    const data = await this.repository.findOneOrFail(id);
    const families = await this.getFamilies(id);
    Object.assign(data, { families });
    return data;
  }

  async getFamilies(id: number): Promise<Family[]> {
    const { studentFamilies } = await this.repository.findOneOrFail(id, {
      relations: ['studentFamilies']
    });
    const familyIds = studentFamilies.filter(s => s.familyId);
    return await this.familyRepository.findByIds(familyIds);
  }
}
