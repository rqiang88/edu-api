import { PartialType } from '@nestjs/swagger';
import { CommonDto } from './common.dto';

export class UpdateStudentInfoDto extends PartialType(CommonDto) {}
