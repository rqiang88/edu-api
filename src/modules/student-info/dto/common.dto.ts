import { ApiProperty } from '@nestjs/swagger';

export class CommonDto {
  @ApiProperty()
  state: string;

  @ApiProperty()
  reamrk: string;

  @ApiProperty()
  gradeId: number;

  @ApiProperty()
  startDay: Date | string;

  @ApiProperty()
  endDay: Date | string;
}
