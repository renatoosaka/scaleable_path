import { ApiProperty } from '@nestjs/swagger';

export class MoveCommentDto {
  @ApiProperty({
    description: 'The ID of the post to move the comment from',
    example: 1,
    type: 'number',
  })
  fromPostId: number;

  @ApiProperty({
    description: 'The ID of the post to move the comment to',
    example: 2,
    type: 'number',
  })
  toPostId: number;
}
