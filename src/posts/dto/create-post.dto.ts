import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: 'The title of the post',
    example: 'This is a post title',
    type: 'string',
  })
  title: string;

  @ApiProperty({
    description: 'The body of the post',
    example: 'This is a post body',
    type: 'string',
  })
  body: string;

  @ApiProperty({
    description: 'The user ID of the post',
    example: 1,
    type: 'number',
  })
  userId: number;

  @ApiProperty({
    description: 'The image of the post',
    example: 'https://example.com/image.jpg',
    type: 'string',
  })
  image: string;
}
