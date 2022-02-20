import { PartialType } from '@nestjs/mapped-types';
import { CommonDto } from './common.dto';

export class UpdateTeacherInfoDto extends PartialType(CommonDto) {}
