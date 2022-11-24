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
import { GradeService } from './grade.service';
import { CreateGradeDto as C } from './dto/create-grade.dto';
import { UpdateGradeDto as U } from './dto/update-grade.dto';
import { ApiTags } from '@nestjs/swagger';
import { Grade } from '@/entities/grade.entity';
import { IQueryResult } from '@/core/interfaces/query-result.interface';
import { QueryGradeDto as Q } from './dto/query-grade.dto';

@ApiTags('Grade')
@Controller('grade')
export class GradeController {
  constructor(private readonly gradeService: GradeService) {}

  @Post()
  create(@Body() createGradeDto: C): Promise<Grade> {
    return this.gradeService.create(createGradeDto);
  }

  @Post('list')
  findAll(@Query() queryGradeDto: Partial<Q>): Promise<IQueryResult<Grade>> {
    return this.gradeService.findAll(queryGradeDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Grade> {
    return this.gradeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGradeDto: U): Promise<Grade> {
    return this.gradeService.update(+id, updateGradeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gradeService.remove(+id);
  }
}
