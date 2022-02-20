import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  TableInheritance,
  UpdateDateColumn
} from 'typeorm';

@Entity({ name: 'articles' })
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  schoolId: number;

  @Column()
  state: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'json' })
  meta: object;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
