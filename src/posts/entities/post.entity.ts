import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Comment } from '../../comments/entities/comment.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  body: string;

  @Column('varchar')
  image: string;

  @Column('varchar')
  title: string;

  @Column('int')
  userId: number;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
