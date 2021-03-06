import { Student } from '@/entities/student.entity';
import { Grade } from '@/entities/grade.entity';
import { Module } from '@nestjs/common';
import { GradesService } from './grades.service';
import { GradesController } from './grades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Grade, Student])],
  controllers: [GradesController],
  providers: [GradesService]
})
export class GradesModule {}
