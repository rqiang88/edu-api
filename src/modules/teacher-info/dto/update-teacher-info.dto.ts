import { CommonDto } from './common.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateTeacherInfoDto extends PartialType(CommonDto) {}
