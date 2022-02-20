import { Validate as ValidateEntity } from '@/decorators/validate.decorator';
import { IsNotEmpty } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  BeforeInsert,
  JoinColumn
} from 'typeorm';
import { Teacher } from './teacher.entity';

@Entity({ name: 'schools' })
export class School {
  @PrimaryGeneratedColumn()
  id: number;

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

  @DeleteDateColumn({ name: 'deleted_at', nullable: true, select: false })
  deletedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Teacher, teacher => teacher.school)
  @JoinColumn({ name: 'school_id' })
  teachers: Teacher[];

  @BeforeInsert()
  @ValidateEntity()
  init() {
    Object.assign(this, { state: 'active' });
  }
}
