import { PartialType } from '@nestjs/swagger';
import { CommonDto } from './common.dto';

export class CreateSchoolDto extends PartialType(CommonDto) {}
