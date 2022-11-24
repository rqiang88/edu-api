import { IExport } from '@/shared/excel/excel-option.interface';
import { QuerySchoolDto } from '@/modules/school/dto/query-school.dto';
import { QueryTeacherDto } from '@/modules/teacher/dto/query-teacher.dto';
import { QueryStudentDto } from '@/modules/student/dto/query-student.dto';
import { Controller, Post } from '@nestjs/common';
import { ExportService } from './export.service';
import { Query } from '@/core/decorators/query.decorator';

@Controller('exports')
export class ExportController {
  constructor(private readonly exportService: ExportService) {}

  @Post('school')
  async exportSchool(
    @Query('export') query: Partial<QuerySchoolDto>
  ): Promise<IExport> {
    return await this.exportService.exportSchool(query);
  }

  @Post('teacher')
  async exportTeacher(
    @Query('export') query: Partial<QueryTeacherDto>
  ): Promise<IExport> {
    return await this.exportService.exportTeacher(query);
  }

  @Post('student')
  async exportStudent(
    @Query('export') query: Partial<QueryStudentDto>
  ): Promise<IExport> {
    return await this.exportService.exportStudent(query);
  }
}
