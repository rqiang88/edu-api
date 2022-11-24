import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import { StudentInfoService } from './student-info.service';
import { CreateStudentInfoDto as C } from './dto/create-student-info.dto';
import { UpdateStudentInfoDto as U } from './dto/update-student-info.dto';
import { QueryStudentInfoDto as Q } from './dto/query-student-info.dto';
import { Query } from '@/core/decorators/query.decorator';
import { StudentInfo } from '@/entities/student-info.entity';
import { IQueryResult } from '@/core/interfaces/query-result.interface';
import { IObject } from '@/core/interfaces/response.interface';

@Controller('student_infos')
export class StudentInfoController {
  constructor(private readonly studentInfoService: StudentInfoService) {}

  @Post()
  create(@Body() createStudentInfoDto: C): Promise<StudentInfo> {
    return this.studentInfoService.create(createStudentInfoDto);
  }

  @Post('list')
  findAll(
    @Query() queryStudentInfoDto: Partial<Q>
  ): Promise<IQueryResult<StudentInfo>> {
    return this.studentInfoService.findAll(queryStudentInfoDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<StudentInfo> {
    return this.studentInfoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStudentInfoDto: U
  ): Promise<StudentInfo> {
    return this.studentInfoService.update(+id, updateStudentInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<IObject> {
    return this.studentInfoService.remove(+id);
  }
}
