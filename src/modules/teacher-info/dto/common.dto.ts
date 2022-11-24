import { ApiProperty } from '@nestjs/swagger';

export class CommonDto {
  @ApiProperty()
  state: string;

  @ApiProperty()
  remark: string;

  @ApiProperty()
  gradeId: number;

  @ApiProperty()
  teacherId: number;

  @ApiProperty()
  startDay: Date | string;

  @ApiProperty()
  endDay: Date | string;
}
