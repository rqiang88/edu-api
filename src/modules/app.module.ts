import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolsModule } from './schools/schools.module';
import { GradesModule } from './grades/grades.module';
import { TeachersModule } from './teachers/teachers.module';
import { FamiliesModule } from './families/families.module';
import { StudentsModule } from './students/students.module';
import { AuthModule } from './auth/auth.module';
import { DepartmentsModule } from './departments/departments.module';
import { StudentInfosModule } from './student-infos/student-infos.module';
import { TeacherInfosModule } from './teacher-infos/teacher-infos.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    SchoolsModule,
    GradesModule,
    TeachersModule,
    FamiliesModule,
    StudentsModule,
    AuthModule,
    DepartmentsModule,
    StudentInfosModule,
    TeacherInfosModule,
    DashboardModule
  ]
})
export class AppModule {}
