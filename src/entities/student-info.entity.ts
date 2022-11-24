import { Entity, Column, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { BaseEntity } from '@/entities/base.entity';
import { Student } from './student.entity';
import { Grade } from './grade.entity';
// import { Student } from '@/entities/student.entity';
// import { Grade } from '@/entities/grade.entity';

@Entity({ name: 'student_infos' })
@Unique(['studentId', 'gradeId'])
export class StudentInfo extends BaseEntity {
  @Column({ name: 'school_id', nullable: true })
  schoolId: number;

  @IsNotEmpty()
  @Column({ name: 'student_id', nullable: true })
  studentId: number;

  @IsNotEmpty()
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

  @ManyToOne(() => Student, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @ManyToOne(() => Grade)
  @JoinColumn({ name: 'grade_id' })
  grade: Grade;
}
