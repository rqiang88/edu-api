import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique
} from 'typeorm';
import { Family } from './family.entity';
import { Student } from './student.entity';

@Entity({ name: 'student_families' })
@Unique(['studentId', 'familyId'])
export class StudentFamily {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'student_id' })
  studentId: number;

  @Column({ name: 'family_id' })
  familyId: number;

  @Column({ nullable: true })
  remark: string;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true, select: false })
  deletedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Student, student => student.studentFamilies)
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @ManyToOne(() => Family)
  @JoinColumn({ name: 'family_id' })
  family: Family;
}
