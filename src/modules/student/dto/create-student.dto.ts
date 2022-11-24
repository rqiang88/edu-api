import { CommonDto } from './common.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateStudentDto extends PartialType(CommonDto) {
  @ApiProperty()
  password?: string;
}
