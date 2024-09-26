import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { CommentsService } from 'src/comments/comments.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,

    private readonly commentsService: CommentsService,
  ) {}

  create(createPostDto: CreatePostDto) {
    const post = this.postRepository.create(createPostDto);
    return this.postRepository.save(post);
  }

  findAll() {
    return this.postRepository.find({
      where: {
        deletedAt: null,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: number) {
    return this.postRepository.findOneBy({ id });
  }

  remove(id: number) {
    const post = this.findOne(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return this.postRepository.softDelete(id);
  }

  async getComments(id: number) {
    const post = await this.findOne(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return this.commentsService.getByPostId(id);
  }
}
