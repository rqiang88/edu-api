import { StudentFamily } from './student-family.entity';
import { StudentInfo } from './student-info.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeInsert,
  Unique
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { digest } from '@/utils/digest.util';
import { Family } from './family.entity';

@Entity({ name: 'students' })
@Unique(['cardNo', 'schoolId'])
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'school_id', nullable: true })
  schoolId: number;

  @Column({ nullable: true, comment: '状态' })
  state: string;

  @Column({ nullable: true, comment: '学号' })
  uid: string;

  @IsNotEmpty()
  @Column({ nullable: true, comment: '姓名' })
  name: string;

  @IsNotEmpty()
  @Column({ nullable: true, comment: '性别' })
  sex: string;

  @Column({ nullable: true, comment: '联系电话' })
  mobile: string;

  @Column({ nullable: true })
  password: string;

  @IsNotEmpty()
  @Column({ nullable: true, name: 'card_no', comment: '证件号', unique: true })
  cardNo: string;

  @Column({ nullable: true, type: 'date', comment: '生日' })
  birthday: Date;

  @Column({ nullable: true, comment: '民族' })
  nation: string;

  @Column({ nullable: true, comment: '籍贯' })
  native: string;

  @Column({ nullable: true, comment: '地址' })
  address: string;

  @Column({ nullable: true, comment: '备注' })
  remark: string;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => StudentInfo, studentInfo => studentInfo.student)
  studentInfos: StudentInfo[];

  @OneToMany(() => StudentFamily, studentFamily => studentFamily.student)
  studentFamilies: StudentFamily[];

  families: Family[] = [];

  @BeforeInsert()
  init() {
    Object.assign(this, { state: 'active', password: digest(this.password) });
  }
}
