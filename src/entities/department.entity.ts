import {
  Column,
  Entity,
  JoinColumn,
  Tree,
  TreeChildren,
  TreeParent
} from 'typeorm';
import { BaseEntity } from '@/entities/base.entity';
import { IsNotEmpty } from 'class-validator';

@Entity({ name: 'departments' })
@Tree('materialized-path')
export class Department extends BaseEntity {
  @Column({ name: 'school_id', nullable: true })
  schoolId: number;

  @Column({ name: 'parent_id', nullable: true })
  parentId: number;

  @Column({ nullable: true })
  state: string;

  @IsNotEmpty()
  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  remark: string;

  @TreeChildren()
  @JoinColumn({ name: 'parent_id' })
  children: Department[];

  @TreeParent()
  @JoinColumn({ name: 'parent_id' })
  parent: Department;
}
