import { Controller } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto as C } from './dto/create-student.dto';
import { UpdateStudentDto as U } from './dto/update-student.dto';
import { BaseController } from '@/lib/base.controller';
import { Student } from '@/entities/student.entity';

@Controller('students')
export class StudentsController extends BaseController<Student, C, U> {
  constructor(private readonly studentsService: StudentsService) {
    super(studentsService);
  }
}
