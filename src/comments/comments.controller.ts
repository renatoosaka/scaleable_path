import { Body, Controller, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ApiTags } from '@nestjs/swagger';
import { MoveCommentDto } from './dto/move-comment.dto';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Post('move')
  async move(@Body() moveCommentDto: MoveCommentDto) {
    return this.commentsService.moveComment(moveCommentDto);
  }
}
