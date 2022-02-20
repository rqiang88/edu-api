import { Teacher } from '@/entities/teacher.entity';
import { Controller } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto as C } from './dto/create-teacher.dto';
import { UpdateTeacherDto as U } from './dto/update-teacher.dto';
import { QueryTeacherDto as Q } from './dto/query-teacher.dto';
import { BaseController } from '@/lib/base.controller';

@Controller('teachers')
export class TeachersController extends BaseController<Teacher, C, U, Q> {
  constructor(private readonly teachersService: TeachersService) {
    super(teachersService);
  }
}
