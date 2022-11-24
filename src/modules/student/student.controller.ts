import { IObject } from '@/core/interfaces/response.interface';
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
import { StudentService } from './student.service';
import { CreateStudentDto as C } from './dto/create-student.dto';
import { UpdateStudentDto as U } from './dto/update-student.dto';
import { QueryStudentDto as Q } from './dto/query-student.dto';
import { ApiTags } from '@nestjs/swagger';
import { Student } from '@/entities/student.entity';
import { IQueryResult } from '@/core/interfaces/query-result.interface';

@ApiTags('Student')
@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  create(@Body() createStudentDto: C): Promise<Student> {
    return this.studentService.create(createStudentDto);
  }

  @Post('list')
  async findAll(
    @Query() queryStudentDto: Partial<Q>
  ): Promise<IQueryResult<Student>> {
    return this.studentService.findAll(queryStudentDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Student> {
    return this.studentService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStudentDto: U
  ): Promise<Student> {
    return this.studentService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<IObject> {
    return this.studentService.remove(+id);
  }
}
