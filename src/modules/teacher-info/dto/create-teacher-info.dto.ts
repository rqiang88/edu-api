import { CommonDto } from './common.dto';
import { PartialType } from '@nestjs/swagger';
export class CreateTeacherInfoDto extends PartialType(CommonDto) {}
