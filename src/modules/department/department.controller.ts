import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto as C } from './dto/create-department.dto';
import { UpdateDepartmentDto as U } from './dto/update-department.dto';
import { QueryDepartmentDto as Q } from './dto/query-department.dto';
import { Department } from '@/entities/department.entity';
import { IQueryResult } from '@/core/interfaces/query-result.interface';
import { Query } from '@/core/decorators/query.decorator';
import { IObject } from '@/core/interfaces/response.interface';

@ApiTags('Department')
@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  async create(@Body() createDepartmentDto: C): Promise<Department> {
    return await this.departmentService.create(createDepartmentDto);
  }

  @Post('list')
  async findAll(
    @Query() queryDepartmentDto: Partial<Q>
  ): Promise<IQueryResult<Department>> {
    return await this.departmentService.findAll(queryDepartmentDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Department> {
    return this.departmentService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDepartmentDto: U
  ): Promise<Department> {
    return this.departmentService.update(+id, updateDepartmentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<IObject> {
    return this.departmentService.remove(+id);
  }
}
