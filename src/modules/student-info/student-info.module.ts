import { StudentInfo } from '@/entities/student-info.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { StudentInfoService } from './student-info.service';
import { StudentInfoController } from './student-info.controller';
import { Student } from '@/entities/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StudentInfo, Student])],
  controllers: [StudentInfoController],
  providers: [StudentInfoService]
})
export class StudentInfoModule {}
