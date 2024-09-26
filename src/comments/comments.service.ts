import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { MoveCommentDto } from './dto/move-comment.dto';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,

    @Inject(forwardRef(() => PostsService))
    private readonly postsService: PostsService,
  ) {}

  create(createCommentDto: CreateCommentDto) {
    const comment = this.commentRepository.create(createCommentDto);
    return this.commentRepository.save(comment);
  }

  getByPostId(postId: number) {
    return this.commentRepository.find({
      where: {
        postId,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async moveComment(moveComment: MoveCommentDto) {
    const [fromPost, toPost] = await Promise.all([
      this.postsService.findOne(moveComment.fromPostId),
      this.postsService.findOne(moveComment.toPostId),
    ]);

    if (!fromPost || !toPost) {
      throw new Error('Post not found');
    }

    try {
      await this.commentRepository.update(
        {
          postId: moveComment.fromPostId,
        },
        {
          postId: moveComment.toPostId,
        },
      );
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to move comment');
    }
  }
}
