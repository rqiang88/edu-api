import {
  EXPORT_SCHOOL,
  EXPORT_TEACHER,
  EXPORT_STUDENT
} from './export.constant';
import { ExcelService } from '@/shared/excel/excel.service';
import { Injectable } from '@nestjs/common';
import { SchoolService } from '@/modules/school/school.service';
import { TeacherService } from '@/modules/teacher/teacher.service';
import { StudentService } from '@/modules/student/student.service';
import { QuerySchoolDto } from '@/modules/school/dto/query-school.dto';
import { QueryTeacherDto } from '@/modules/teacher/dto/query-teacher.dto';
import { QueryStudentDto } from '@/modules/student/dto/query-student.dto';
import { IExport } from '@/shared/excel/excel-option.interface';

@Injectable()
export class ExportService {
  constructor(
    private readonly schoolService: SchoolService,
    private readonly teacherService: TeacherService,
    private readonly studentService: StudentService,
    private readonly excelService: ExcelService
  ) {}

  async exportSchool(query: Partial<QuerySchoolDto>): Promise<IExport> {
    const result = await this.schoolService.findAll(query),
      data = [];

    for (const item of result.data) data.push([item.name]);
    return await this.excelService.create({
      columns: EXPORT_SCHOOL,
      filename: '学校',
      data
    });
  }

  async exportTeacher(query: Partial<QueryTeacherDto>): Promise<IExport> {
    const result = await this.teacherService.findAll(query),
      data = [];

    for (const item of result.data)
      data.push([item.name, item.sex, item.cardNo, item.mobile]);
    return await this.excelService.create({
      columns: EXPORT_TEACHER,
      filename: '老师',
      data
    });
  }

  async exportStudent(query: Partial<QueryStudentDto>): Promise<IExport> {
    console.log(query.limit);
    const result = await this.studentService.findAll(query),
      data = [];

    for (const item of result.data)
      data.push([item.name, item.sex, item.cardNo, item.mobile]);
    return await this.excelService.create({
      columns: EXPORT_STUDENT,
      filename: '学生',
      data
    });
  }
}
