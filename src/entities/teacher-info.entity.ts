import { Entity, Column, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { BaseEntity } from '@/entities/base.entity';
import { Grade } from '@/entities/grade.entity';

@Entity({ name: 'teacher_infos' })
@Unique(['gradeId', 'teacherId'])
export class TeacherInfo extends BaseEntity {
  @Column({ name: 'teacher_id' })
  teacherId: number;

  @Column({ name: 'grade_id', nullable: true })
  gradeId: number;

  @Column({ nullable: true })
  state: string;

  @Column({ name: 'start_day', nullable: true, type: 'date' })
  startDay: Date;

  @Column({ name: 'end_day', nullable: true, type: 'date' })
  endDay: Date;

  @Column({ nullable: true })
  remark: string;

  @ManyToOne(() => Grade)
  @JoinColumn({ name: 'grade_id' })
  grade: Grade;
}
