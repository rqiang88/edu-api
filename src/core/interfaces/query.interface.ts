import { ApiProperty } from '@nestjs/swagger';

export class IQuery {
  @ApiProperty({ default: 1 })
  page: number;

  @ApiProperty({ default: 20 })
  limit: number;

  skip: number;
  take: number;
}
