import { HttpService } from '@nestjs/axios';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/posts/entities/post.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { Repository } from 'typeorm';
import { PostDTO } from './dto/post.dto';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,

    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,

    private readonly httpService: HttpService,
  ) {}

  async onModuleInit() {
    const postCount = await this.postRepository.count();

    if (postCount === 0) {
      const { data } =
        await this.httpService.axiosRef.get<PostDTO[]>('/test-posts');

      await this.postRepository.save(this.postRepository.create(data));
    }

    const commentCount = await this.commentRepository.count();

    if (commentCount === 0) {
      const { data: dataComments } =
        await this.httpService.axiosRef.get<Comment[]>('/test-comments');

      await this.commentRepository.save(
        this.commentRepository.create(dataComments),
      );
    }
  }
}
