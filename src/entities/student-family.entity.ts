import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseEntity } from '@/entities/base.entity';
import { Family } from '@/entities/family.entity';
import { Student } from '@/entities/student.entity';

@Entity({ name: 'student_families' })
@Unique(['studentId', 'familyId'])
export class StudentFamily extends BaseEntity {
  @Column({ name: 'student_id' })
  studentId: number;

  @Column({ name: 'family_id' })
  familyId: number;

  @Column({ nullable: true })
  remark: string;

  @ManyToOne(() => Student, student => student.studentFamilies)
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @ManyToOne(() => Family)
  @JoinColumn({ name: 'family_id' })
  family: Family;
}
