import { PartialType } from '@nestjs/swagger';
import { CommonDto } from './common.dto';

export class CreateStudentInfoDto extends PartialType(CommonDto) {}
