import { Column, Entity, TableInheritance } from 'typeorm';
import { BaseEntity } from '@/entities/base.entity';

@Entity({ name: 'articles' })
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Article extends BaseEntity {
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
}
