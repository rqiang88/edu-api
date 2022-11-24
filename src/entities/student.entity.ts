import { Entity, Column, OneToMany, BeforeInsert, Unique } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { digest } from '@/core/utils/digest.util';
import { BaseEntity } from '@/entities/base.entity';
import { StudentFamily } from '@/entities/student-family.entity';
import { StudentInfo } from '@/entities/student-info.entity';
import { Family } from '@/entities/family.entity';

@Entity({ name: 'students' })
@Unique(['cardNo', 'schoolId'])
export class Student extends BaseEntity {
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
