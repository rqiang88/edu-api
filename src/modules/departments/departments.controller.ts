import { Department } from '@/entities/department.entity';
import { BaseController } from '@/lib/base.controller';
import { Controller } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto as C } from './dto/create-department.dto';
import { UpdateDepartmentDto as U } from './dto/update-department.dto';
import { QueryDepartmentDto as Q } from './dto/query-department.dto';

@Controller('departments')
export class DepartmentsController extends BaseController<Department, C, U, Q> {
  constructor(private readonly departmentsService: DepartmentsService) {
    super(departmentsService);
  }
}
