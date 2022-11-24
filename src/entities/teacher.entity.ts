import {
  Entity,
  Column,
  ManyToOne,
  BeforeInsert,
  JoinColumn,
  Unique
} from 'typeorm';
import { digest } from '@/core/utils/digest.util';
import { BaseEntity } from '@/entities/base.entity';
import { School } from '@/entities/school.entity';
import { IsNotEmpty } from 'class-validator';
import { Validate } from '@/core/decorators/validate.decorator';

@Entity({ name: 'teachers' })
@Unique(['cardNo', 'schoolId'])
export class Teacher extends BaseEntity {
  @Column({ name: 'school_id', nullable: true })
  schoolId: number;

  @Column({ nullable: true })
  state: string;

  @IsNotEmpty()
  @Column({ nullable: true, comment: '姓名' })
  name: string;

  @IsNotEmpty()
  @Column({ nullable: true, comment: '性别' })
  sex: string;

  @IsNotEmpty()
  @Column({ nullable: true, comment: '联系电话' })
  mobile: string;

  @Column({ nullable: true })
  password: string;

  @IsNotEmpty()
  @Column({ nullable: true, name: 'card_no', comment: '证件号' })
  cardNo: string;

  @Column({ nullable: true, type: 'date', comment: '生日' })
  birthday: Date;

  @Column({ nullable: true, comment: '民族' })
  nation: string;

  @Column({ nullable: true, comment: '籍贯' })
  native: string;

  @Column({ nullable: true, comment: '学历' })
  education: string;

  @Column({ nullable: true, comment: '地址' })
  address: string;

  @Column({ nullable: true, comment: '备注' })
  remark: string;

  @ManyToOne(() => School, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'school_id' })
  school: School;

  @BeforeInsert()
  @Validate()
  init() {
    Object.assign(this, { state: 'active', password: digest(this.password) });
  }
}
