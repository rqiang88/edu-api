import { CommonDto } from './common.dto';
import { PartialType } from '@nestjs/mapped-types';

export class CreateTeacherDto extends PartialType(CommonDto) {
  readonly password: string;
}
