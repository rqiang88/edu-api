import { StudentInfo } from '@/entities/student-info.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { Student } from '@/entities/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, StudentInfo])],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService]
})
export class StudentModule {}
