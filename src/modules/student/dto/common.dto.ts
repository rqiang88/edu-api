import { ApiProperty } from '@nestjs/swagger';

export class CommonDto {
  @ApiProperty()
  readonly schoolId: number;

  @ApiProperty()
  readonly state: string;

  @ApiProperty()
  readonly sex: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly mobile: string;

  @ApiProperty()
  readonly cardNo: string;

  @ApiProperty()
  readonly birthday: string;

  @ApiProperty()
  readonly nation: string;

  @ApiProperty()
  readonly native: string;

  @ApiProperty()
  readonly address: string;

  @ApiProperty()
  readonly remark: string;
}
