import { TeacherInfo } from '@/entities/teacher-info.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTeacherInfoDto as C } from './dto/create-teacher-info.dto';
import { UpdateTeacherInfoDto as U } from './dto/update-teacher-info.dto';
import { QueryTeacherInfoDto as Q } from './dto/query-teacher-info.dto';
import { IQueryResult } from '@/core/interfaces/query-result.interface';
import { IObject } from '@/core/interfaces/response.interface';

@Injectable()
export class TeacherInfoService {
  constructor(
    @InjectRepository(TeacherInfo)
    private readonly repository: Repository<TeacherInfo>
  ) {}

  async findAll(
    queryTeacherInfo: Partial<Q>
  ): Promise<IQueryResult<TeacherInfo>> {
    const { teacherId, page, limit, take, skip } = queryTeacherInfo;
    const repository = await this.repository.createQueryBuilder('tinfo');

    if (teacherId) {
      repository.where('tinfo.teacher_id = :teacherId', {
        teacherId
      });
    }

    const total = await repository.getCount();
    const data = await repository
      .leftJoinAndSelect('tinfo.grade', 'grade')
      .orderBy('tinfo.id', 'DESC')
      .take(take)
      .skip(skip)
      .getMany();
    const paginate = { page, limit, total };

    return { data, paginate };
  }

  async create(params: C): Promise<TeacherInfo> {
    const entity = await this.repository.create(params);
    const data = await this.repository.save(entity);
    return await this.findOne(data.id);
  }

  async findOne(id: number): Promise<TeacherInfo> {
    return this.repository.findOneOrFail({
      where: { id },
      relations: ['grade']
    });
  }

  async update(id: number, updateTeacherInfoDto: U): Promise<TeacherInfo> {
    await this.repository.update(id, updateTeacherInfoDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<IObject> {
    await this.repository.softDelete(id);
    return { message: 'success' };
  }
}
