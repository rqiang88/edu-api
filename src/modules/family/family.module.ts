import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { FamilyService } from './family.service';
import { FamilyController } from './family.controller';
import { Family } from '@/entities/family.entity';
import { StudentFamily } from '@/entities/student-family.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Family, StudentFamily])],
  controllers: [FamilyController],
  providers: [FamilyService]
})
export class FamilyModule {}
