import {
  Entity,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique
} from 'typeorm';
import { Grade } from './grade.entity';

@Entity({ name: 'teacher_infos' })
@Unique(['gradeId', 'teacherId'])
export class TeacherInfo {
  @PrimaryGeneratedColumn()
  id: number;

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

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Grade)
  @JoinColumn({ name: 'grade_id' })
  grade: Grade;
}
