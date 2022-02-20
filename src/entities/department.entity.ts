import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
  UpdateDateColumn
} from 'typeorm';

@Entity({ name: 'departments' })
@Tree('materialized-path')
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'school_id', nullable: true })
  schoolId: number;

  @Column({ name: 'parent_id', nullable: true })
  parentId: number;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  remark: string;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @TreeChildren()
  @JoinColumn({ name: 'parent_id' })
  children: Department[];

  @TreeParent()
  @JoinColumn({ name: 'parent_id' })
  parent: Department;
}
