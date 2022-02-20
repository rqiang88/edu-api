import { Department } from '@/entities/department.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { DepartmentsController } from './departments.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Department])],
  controllers: [DepartmentsController],
  providers: [DepartmentsService]
})
export class DepartmentsModule {}
