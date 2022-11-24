import { ApiProperty } from '@nestjs/swagger';

export class CommonDto {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly state: string;

  @ApiProperty()
  readonly sex: string;

  @ApiProperty()
  readonly mobile: string;

  @ApiProperty()
  readonly cardNo: string;

  @ApiProperty()
  readonly relation: string;

  @ApiProperty()
  readonly nation: string;

  @ApiProperty()
  readonly native: string;

  @ApiProperty()
  readonly education: string;

  @ApiProperty()
  readonly work: string;

  @ApiProperty()
  readonly address: string;

  @ApiProperty()
  readonly remark: string;
}
