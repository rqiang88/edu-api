import { ApiProperty } from '@nestjs/swagger';

export class CommonDto {
  @ApiProperty()
  readonly state: string;

  @ApiProperty()
  readonly name: string;
}
