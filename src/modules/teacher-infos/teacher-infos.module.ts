import { TeacherInfo } from '@/entities/teacher-info.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TeacherInfosService } from './teacher-infos.service';
import { TeacherInfosController } from './teacher-infos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TeacherInfo])],
  controllers: [TeacherInfosController],
  providers: [TeacherInfosService]
})
export class TeacherInfosModule {}
