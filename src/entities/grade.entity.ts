import { StudentInfo } from './student-info.entity';
import { School } from './school.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
  OneToMany,
  ManyToMany
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Student } from './student.entity';

@Entity({ name: 'grades' })
@Unique(['schoolId', 'name'])
export class Grade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'school_id', nullable: true })
  schoolId: number;

  @Column({ nullable: true, comment: '状态' })
  state: string;

  @IsNotEmpty()
  @Column({ nullable: true, comment: '名称' })
  name: string;

  @Column({ nullable: true, comment: '备注' })
  remark: string;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true, select: false })
  deletedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => School)
  @JoinColumn({ name: 'school_id' })
  school: School;

  @OneToMany(() => StudentInfo, sInfo => sInfo.grade)
  studentInfos: StudentInfo[];

  // @ManyToMany(() => Student, student => student.grades)
  // students: Student[];
}
