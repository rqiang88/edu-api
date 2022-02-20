import { IQuery } from '@/interfaces/query.interface';
import { Paginate } from '@/decorators/paginate.decorator';
import { BaseService } from '@/lib/base.service';
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

type IObject = Record<string, any>;

@UseGuards(AuthGuard('jwt'))
@Controller()
export class BaseController<E = IObject, C = E, U = C, Q = C> {
  protected service: BaseService<E, C, U, Q>;
  constructor(service: BaseService<E, C, U, Q>) {
    this.service = service;
  }

  @Post()
  async create(@Body() params: C): Promise<E> {
    return await this.service.create(params);
  }

  @Post('list')
  async findAll(@Paginate() params: Q): Promise<Partial<IQuery<E>>> {
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
