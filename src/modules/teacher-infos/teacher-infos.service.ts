import { TeacherInfo } from '@/entities/Teacher-info.entity';
import { BaseService } from '@/lib/base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTeacherInfoDto as C } from './dto/create-teacher-info.dto';
import { UpdateTeacherInfoDto as U } from './dto/update-teacher-info.dto';
import { QueryTeacherInfoDto as Q } from './dto/query-teacher-info.dto';
import { IQuery } from '@/interfaces/query.interface';

@Injectable()
export class TeacherInfosService extends BaseService<TeacherInfo, C, U, Q> {
  constructor(
    @InjectRepository(TeacherInfo)
    private readonly TeacherInfoRepository: Repository<TeacherInfo>
  ) {
    super(TeacherInfoRepository);
  }

  async findAll(params: Q): Promise<IQuery<TeacherInfo>> {
    const { teacherId, page, limit, take, skip } = params;
    let repository = await this.repository.createQueryBuilder('tinfo');

    if (teacherId) {
      repository = repository.where('tinfo.teacher_id = :teacherId', {
        teacherId
      });
    }

    const totalCount = await repository.getCount();
    const records = await repository
      .leftJoinAndSelect('tinfo.grade', 'grade')
      .orderBy('tinfo.id', 'DESC')
      .take(take)
      .skip(skip)
      .getMany();
    const paginate = { page, limit, totalCount };

    return { records, paginate };
  }

  async create(params: C): Promise<TeacherInfo> {
    const entity = await this.repository.create(params);
    const data = await this.repository.save(entity);
    return this.repository.findOneOrFail(data.id, { relations: ['grade'] });
  }
}
