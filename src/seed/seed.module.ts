import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/posts/entities/post.entity';
import { Comment } from 'src/comments/entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, Comment]),
    HttpModule.register({
      baseURL: 'https://www.scalablepath.com/api/test',
    }),
  ],
  providers: [SeedService],
})
export class SeedModule {}
