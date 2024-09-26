import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Delete(':post_id')
  remove(@Param('post_id') id: string) {
    return this.postsService.remove(+id);
  }

  @Get(':post_id/comments')
  getComments(@Param('post_id') id: string) {
    return this.postsService.getComments(+id);
  }
}
