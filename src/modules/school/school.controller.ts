import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { SchoolService } from './school.service';
import { CreateSchoolDto as C } from './dto/create-school.dto';
import { UpdateSchoolDto as U } from './dto/update-school.dto';
import { QuerySchoolDto as Q } from './dto/query-school.dto';
import { School } from '@/entities/school.entity';
import { Query } from '@/core/decorators/query.decorator';
import { IQueryResult } from '@/core/interfaces/query-result.interface';
import { IObject } from '@/core/interfaces/response.interface';

@ApiTags('School')
@Controller('schools')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Post()
  async create(@Body() createSchoolDto: C): Promise<School> {
    return this.schoolService.create(createSchoolDto);
  }

  @ApiBody({ type: Q })
  @Post('list')
  async findAll(
    @Query() querySchoolDto: Partial<Q>
  ): Promise<IQueryResult<School>> {
    return this.schoolService.findAll(querySchoolDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<School> {
    return this.schoolService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSchoolDto: U) {
    return this.schoolService.update(+id, updateSchoolDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<IObject> {
    return this.schoolService.remove(+id);
  }
}
