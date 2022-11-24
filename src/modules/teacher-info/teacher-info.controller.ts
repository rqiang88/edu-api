import { IQueryResult } from '@/core/interfaces/query-result.interface';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import { TeacherInfoService } from './teacher-info.service';
import { CreateTeacherInfoDto as C } from './dto/create-teacher-info.dto';
import { UpdateTeacherInfoDto as U } from './dto/update-teacher-info.dto';
import { QueryTeacherDto as Q } from '@/modules/teacher/dto/query-teacher.dto';
import { ApiTags } from '@nestjs/swagger';
import { Query } from '@/core/decorators/query.decorator';
import { IObject } from '@/core/interfaces/response.interface';
import { TeacherInfo } from '@/entities/teacher-info.entity';

@ApiTags('TeacherInfo')
@Controller('teacher-info')
export class TeacherInfoController {
  constructor(private readonly teacherInfoService: TeacherInfoService) {}

  @Post()
  create(@Body() createTeacherInfoDto: C): Promise<TeacherInfo> {
    return this.teacherInfoService.create(createTeacherInfoDto);
  }

  @Post('list')
  async findAll(
    @Query() queryTeacherDto: Partial<Q>
  ): Promise<IQueryResult<TeacherInfo>> {
    return await this.teacherInfoService.findAll(queryTeacherDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<TeacherInfo> {
    return this.teacherInfoService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTeacherInfoDto: U
  ): Promise<TeacherInfo> {
    return await this.teacherInfoService.update(+id, updateTeacherInfoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<IObject> {
    return await this.teacherInfoService.remove(+id);
  }
}
