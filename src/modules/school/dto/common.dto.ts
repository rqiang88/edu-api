import { ApiPropertyOptional } from '@nestjs/swagger';

export class CommonDto {
  @ApiPropertyOptional()
  name: string;

  @ApiPropertyOptional()
  shortName: string;

  @ApiPropertyOptional()
  description: string;
}
