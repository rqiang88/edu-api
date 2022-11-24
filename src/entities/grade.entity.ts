import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
  OneToMany
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { BaseEntity } from '@/entities/base.entity';
import { StudentInfo } from '@/entities/student-info.entity';
import { School } from '@/entities/school.entity';

@Entity({ name: 'grades' })
@Unique(['schoolId', 'name'])
export class Grade extends BaseEntity {
  @Column({ name: 'school_id', nullable: true })
  schoolId: number;

  @Column({ nullable: true, comment: '状态' })
  state: string;

  @IsNotEmpty()
  @Column({ nullable: true, comment: '名称' })
  name: string;

  @Column({ nullable: true, comment: '备注' })
  remark: string;

  @ManyToOne(() => School, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'school_id' })
  school: School;

  @OneToMany(() => StudentInfo, sInfo => sInfo.grade)
  studentInfos: StudentInfo[];
}
