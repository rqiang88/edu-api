import { StudentInfo as sInfo } from '@/entities/student-info.entity';
import { BaseController } from '@/lib/base.controller';
import { Controller } from '@nestjs/common';
import { StudentInfosService } from './student-infos.service';
import { CreateStudentInfoDto as C } from './dto/create-student-info.dto';
import { UpdateStudentInfoDto as U } from './dto/update-student-info.dto';
import { QueryStudentInfoDto as Q } from './dto/query-student-info.dto';

@Controller('student_infos')
export class StudentInfosController extends BaseController<sInfo, C, U, Q> {
  constructor(private readonly studentInfosService: StudentInfosService) {
    super(studentInfosService);
  }
}
