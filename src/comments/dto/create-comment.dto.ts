import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'The body of the comment',
    example: 'This is a comment body',
    type: 'string',
  })
  body: string;

  @ApiProperty({
    description: 'The post ID of the comment',
    example: 1,
    type: 'number',
  })
  postId: number;

  @ApiProperty({
    description: 'The name of the comment author',
    example: 'John Doe',
    type: 'string',
  })
  name: string;

  @ApiProperty({
    description: 'The email of the comment author',
    example: 'john.doe@email.com',
    type: 'string',
  })
  email: string;
}
