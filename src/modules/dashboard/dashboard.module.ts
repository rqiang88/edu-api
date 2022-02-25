import { Family } from '@/entities/family.entity';
import { Teacher } from '@/entities/teacher.entity';
import { Student } from '@/entities/student.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, CacheModule } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student, Teacher, Family]),
    CacheModule.register()
  ],
  controllers: [DashboardController],
  providers: [DashboardService]
})
export class DashboardModule {}
