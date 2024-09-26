import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsModule } from 'src/comments/comments.module';
import { Comment } from 'src/comments/entities/comment.entity';
import { Post } from 'src/posts/entities/post.entity';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      migrations: [],
      entities: [Post, Comment],
    }),
    PostsModule,
    CommentsModule,
  ],
})
export class AppModuleTest {}
