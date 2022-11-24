import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import { FamilyService } from './family.service';
import { CreateFamilyDto as C } from './dto/create-family.dto';
import { UpdateFamilyDto as U } from './dto/update-family.dto';
import { QueryFamilyDto as Q } from './dto/query-family.dto';
import { ApiTags } from '@nestjs/swagger';
import { Query } from '@/core/decorators/query.decorator';
import { IQueryResult } from '@/core/interfaces/query-result.interface';
import { Family } from '@/entities/family.entity';
import { IObject } from '@/core/interfaces/response.interface';

@ApiTags('Family')
@Controller('family')
export class FamilyController {
  constructor(private readonly familyService: FamilyService) {}

  @Post('list')
  async findAll(
    @Query() queryFamilyDto: Partial<Q>
  ): Promise<IQueryResult<Family>> {
    return this.familyService.findAll(queryFamilyDto);
  }

  @Post()
  async create(@Body() createFamilyDto: C): Promise<Family> {
    return this.familyService.create(createFamilyDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.familyService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateFamilyDto: U) {
    return this.familyService.update(+id, updateFamilyDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<IObject> {
    return this.familyService.remove(+id);
  }
}
