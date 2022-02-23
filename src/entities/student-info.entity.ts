import { Grade } from './grade.entity';
import { Student } from './student.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity({ name: 'student_infos' })
@Unique(['studentId', 'gradeId'])
export class StudentInfo {
  @PrimaryGeneratedColumn()
  id: number;

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

  @DeleteDateColumn({ name: 'deleted_at', nullable: true, select: false })
  deletedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Student)
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @ManyToOne(() => Grade, grade => grade.studentInfos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'grade_id' })
  grade: Grade;
}
