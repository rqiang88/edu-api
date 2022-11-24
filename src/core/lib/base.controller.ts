import { BaseService } from './base.service';
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param
} from '@nestjs/common';
import { IObject } from '../interfaces/response.interface';
import { IQueryResult } from '../interfaces/query-result.interface';
import { Query } from '../decorators/query.decorator';
import { DeepPartial } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { IQuery } from '../interfaces/query.interface';

@Controller()
export class BaseController<
  E = IObject,
  C extends DeepPartial<E> = E,
  U extends QueryDeepPartialEntity<E> = IObject,
  Q extends Partial<IQuery> = IObject
> {
  protected service: BaseService<E, C, U, Q>;
  constructor(service: BaseService<E, C, U, Q>) {
    this.service = service;
  }

  @Post()
  async create(@Body() params: C): Promise<E> {
    return await this.service.create(params);
  }

  @Post('list')
  async findAll(@Query() params: Q): Promise<Partial<IQueryResult<E>>> {
    return await this.service.findAll(params);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() params: U) {
    return await this.service.update(+id, params);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.service.remove(+id);
  }
}
