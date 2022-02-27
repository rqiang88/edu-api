import { Teacher } from '@/entities/teacher.entity';
import { IQuery } from '@/interfaces/query.interface';
import { BaseService } from '@/lib/base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTeacherDto as C } from './dto/create-teacher.dto';
import { UpdateTeacherDto as U } from './dto/update-teacher.dto';
import { QueryTeacherDto as Q } from './dto/query-teacher.dto';
import { digest } from '@/utils/digest.util';

@Injectable()
export class TeachersService extends BaseService<Teacher, C, U, Q> {
  constructor(
    @InjectRepository(Teacher)
    protected readonly teacherRepository: Repository<Teacher>
  ) {
    super(teacherRepository);
  }

  async findAll(params: Q): Promise<IQuery<Teacher>> {
    const { name, page, limit, take, skip } = params;
    let repository = await this.repository.createQueryBuilder('teacher');

    if (name) {
      repository = repository.where('name like :name', { name: `%${name}%` });
    }

    const totalCount = await repository.getCount();
    const records = await repository
      .orderBy('id', 'DESC')
      .take(take)
      .skip(skip)
      .getMany();
    const paginate = { page, limit, totalCount };

    return { records, paginate };
  }

  async reset(id: number, password: string) {
    await this.repository.update(id, { password: digest(password) });
    return await this.repository.findOneOrFail(id);
  }
}
