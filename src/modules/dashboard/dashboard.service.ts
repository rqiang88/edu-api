import { IDashboard } from './dashboard.interface';
import { Family } from '@/entities/family.entity';
import { Student } from '@/entities/student.entity';
import { Teacher } from '@/entities/teacher.entity';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';

@Injectable()
export class DashboardService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Family)
    private readonly familyRepository: Repository<Family>
  ) {}

  async findAll(): Promise<IDashboard> {
    const result = await this.cacheManager.get('dashbord');
    if (result) {
      return JSON.parse(result as string);
    } else {
      const studentCount = await this.studentRepository.count();
      const teacherCount = await this.teacherRepository.count();
      const familyCount = await this.familyRepository.count();
      const data = { studentCount, teacherCount, familyCount };
      await this.cacheManager.set('dashbord', JSON.stringify(data), {
        ttl: 1800
      });
      return { studentCount, teacherCount, familyCount };
    }
  }
}
