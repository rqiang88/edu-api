import { Entity, Column, OneToMany, Unique, BeforeInsert } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { BaseEntity } from '@/entities/base.entity';
import { Student } from '@/entities/student.entity';
import { StudentFamily } from '@/entities/student-family.entity';
import { Validate } from '@/core/decorators/validate.decorator';
@Entity({ name: 'families' })
@Unique(['schoolId', 'cardNo'])
export class Family extends BaseEntity {
  @Column({ name: 'school_id', nullable: true })
  schoolId: number;

  @IsNotEmpty()
  @Column({ nullable: true, comment: '姓名' })
  name: string;

  @IsNotEmpty()
  @Column({ nullable: true, comment: '性别' })
  sex: string;

  @IsNotEmpty()
  @Column({ nullable: true, comment: '关系' })
  relation: string;

  @IsNotEmpty()
  @Column({ nullable: true, comment: '联系电话' })
  mobile: string;

  @Column({ nullable: true, name: 'card_no', comment: '证件号' })
  cardNo: string;

  @Column({ nullable: true, comment: '民族' })
  nation: string;

  @Column({ nullable: true, comment: '籍贯' })
  native: string;

  @Column({ nullable: true, comment: '学历' })
  education: string;

  @Column({ nullable: true, comment: '地址' })
  address: string;

  @Column({ nullable: true, comment: '工作单位' })
  work: string;

  @Column({ nullable: true, comment: '备注' })
  remark: string;

  students: Student[] = [];

  @OneToMany(() => StudentFamily, sFamily => sFamily.family)
  studentFamilies: StudentFamily[];

  @BeforeInsert()
  @Validate()
  init() {}
}
