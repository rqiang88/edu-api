import { Entity, Column, OneToMany, BeforeInsert, JoinColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Validate } from '@/core/decorators/validate.decorator';
import { BaseEntity } from '@/entities/base.entity';
import { Teacher } from '@/entities/teacher.entity';

@Entity({ name: 'schools' })
export class School extends BaseEntity {
  @Column({ nullable: true })
  state: string;

  @IsNotEmpty()
  @Column({ nullable: true })
  name: string;

  @Column({ name: 'short_name', nullable: true })
  shortName: string;

  @IsNotEmpty()
  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => Teacher, teacher => teacher.school)
  @JoinColumn({ name: 'school_id' })
  teachers: Teacher[];

  @BeforeInsert()
  @Validate()
  init() {
    Object.assign(this, { state: 'active' });
  }
}
