import { ExcelModule } from '@/shared/excel/excel.module';
import { SchoolModule } from '@/modules/school/school.module';
import { TeacherModule } from '@/modules/teacher/teacher.module';
import { StudentModule } from '@/modules/student/student.module';
import { Module } from '@nestjs/common';
import { ExportService } from './export.service';
import { ExportController } from './export.controller';

@Module({
  imports: [ExcelModule, SchoolModule, TeacherModule, StudentModule],
  controllers: [ExportController],
  providers: [ExportService]
})
export class ExportModule {}
