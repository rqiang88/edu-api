import { StudentInfo } from '@/entities/student-info.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { StudentInfosService } from './student-infos.service';
import { StudentInfosController } from './student-infos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([StudentInfo])],
  controllers: [StudentInfosController],
  providers: [StudentInfosService]
})
export class StudentInfosModule {}
