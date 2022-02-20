import { Department } from '@/entities/department.entity';
import { BaseService } from '@/lib/base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDepartmentDto as C } from './dto/create-department.dto';
import { UpdateDepartmentDto as U } from './dto/update-department.dto';
import { QueryDepartmentDto as Q } from './dto/query-department.dto';

@Injectable()
export class DepartmentsService extends BaseService<Department, C, U, Q> {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>
  ) {
    super(departmentRepository);
  }
}
