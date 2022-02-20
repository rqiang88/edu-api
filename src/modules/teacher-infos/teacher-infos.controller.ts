import { TeacherInfo as tInfo } from '@/entities/teacher-info.entity';
import { BaseController } from '@/lib/base.controller';
import { Controller } from '@nestjs/common';
import { TeacherInfosService } from './teacher-infos.service';
import { CreateTeacherInfoDto as C } from './dto/create-teacher-info.dto';
import { UpdateTeacherInfoDto as U } from './dto/update-teacher-info.dto';
import { QueryTeacherInfoDto as Q } from './dto/query-teacher-info.dto';

@Controller('teacher_infos')
export class TeacherInfosController extends BaseController<tInfo, C, U, Q> {
  constructor(private readonly teacherInfosService: TeacherInfosService) {
    super(teacherInfosService);
  }
}
