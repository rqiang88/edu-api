import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query
} from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto as C } from './dto/create-teacher.dto';
import { UpdateTeacherDto as U } from './dto/update-teacher.dto';
import { QueryTeacherDto as Q } from './dto/query-teacher.dto';
import { IQueryResult } from '@/core/interfaces/query-result.interface';
import { Teacher } from '@/entities/teacher.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Teacher')
@Controller('teachers')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post('list')
  async findAll(
    @Query() queryTeacherDto: Partial<Q>
  ): Promise<IQueryResult<Teacher>> {
    return await this.teacherService.findAll(queryTeacherDto);
  }

  @Post()
  create(@Body() createTeacherDto: C): Promise<Teacher> {
    return this.teacherService.create(createTeacherDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Teacher> {
    return this.teacherService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTeacherDto: U
  ): Promise<Teacher> {
    return this.teacherService.update(+id, updateTeacherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teacherService.remove(+id);
  }
}
