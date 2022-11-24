import { SharedModule } from './shared/shared.module';
import configuration from './config/configuration';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TeacherModule } from './modules/teacher/teacher.module';
import { SchoolModule } from './modules/school/school.module';
import { StudentModule } from './modules/student/student.module';
import { DepartmentModule } from './modules/department/department.module';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { StudentInfoModule } from './modules/student-info/student-info.module';
import { GradeModule } from './modules/grade/grade.module';
import { FamilyModule } from './modules/family/family.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './core/guards/auth.guard';
import { ExportModule } from './modules/export/export.module';
import { TeacherInfoModule } from './modules/teacher-info/teacher-info.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        configService.get<TypeOrmModuleAsyncOptions>('db'),
      inject: [ConfigService]
    }),
    SharedModule,
    TeacherModule,
    SchoolModule,
    StudentModule,
    DepartmentModule,
    AuthModule,
    StudentInfoModule,
    GradeModule,
    FamilyModule,
    ExportModule,
    TeacherInfoModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ]
})
export class AppModule {}
