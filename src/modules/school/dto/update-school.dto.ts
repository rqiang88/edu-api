import { PartialType } from '@nestjs/mapped-types';
import { CommonDto } from './common.dto';

export class UpdateSchoolDto extends PartialType(CommonDto) {}
