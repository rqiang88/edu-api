import { CommonDto } from './common.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateStudentDto extends PartialType(CommonDto) {}
