import { Grade } from '@/entities/grade.entity';
import { BaseController } from '@/lib/base.controller';
import { Controller, Param, Post } from '@nestjs/common';
import { GradesService } from './grades.service';
import { CreateGradeDto as C } from './dto/create-grade.dto';
import { UpdateGradeDto as U } from './dto/update-grade.dto';
import { QueryGradeDto as Q } from './dto/query-grade.dto';

@Controller('grades')
export class GradesController extends BaseController<Grade, C, U, Q> {
  constructor(private readonly gradesService: GradesService) {
    super(gradesService);
  }

  @Post(':gradeId/students')
  async getStudents(@Param('gradeId') gradeId: string) {
    return await this.gradesService.getStudents(+gradeId);
  }
}
