import { TeacherInfo } from '@/entities/teacher-info.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TeacherInfoService } from './teacher-info.service';
import { TeacherInfoController } from './teacher-info.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TeacherInfo])],
  controllers: [TeacherInfoController],
  providers: [TeacherInfoService]
})
export class TeacherInfoModule {}
