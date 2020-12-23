import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { User } from '../auth/user.entity';

@Entity('Task')
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'text' })
  status: TaskStatus;

  @ManyToOne(
    () => User,
    user => user.tasks,
    { eager: false, onUpdate: 'CASCADE', onDelete: 'CASCADE' },
  )
  user: User;
}
