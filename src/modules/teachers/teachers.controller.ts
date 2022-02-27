import { Teacher } from '@/entities/teacher.entity';
import { Body, Controller, Param, Post } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto as C } from './dto/create-teacher.dto';
import { UpdateTeacherDto as U } from './dto/update-teacher.dto';
import { QueryTeacherDto as Q } from './dto/query-teacher.dto';
import { ResetTeacherDto as R } from './dto/reset-teacher.dto';
import { BaseController } from '@/lib/base.controller';

@Controller('teachers')
export class TeachersController extends BaseController<Teacher, C, U, Q> {
  constructor(private readonly teachersService: TeachersService) {
    super(teachersService);
  }

  @Post(':id/reset')
  async reset(@Param('id') id: string, @Body() { password }: R) {
    return await this.teachersService.reset(+id, password);
  }
}
