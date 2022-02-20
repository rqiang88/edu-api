import { Student } from '@/entities/student.entity';
import { Family } from '@/entities/family.entity';
import { Module } from '@nestjs/common';
import { FamiliesService } from './families.service';
import { FamiliesController } from './families.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Family, Student])],
  controllers: [FamiliesController],
  providers: [FamiliesService]
})
export class FamiliesModule {}
