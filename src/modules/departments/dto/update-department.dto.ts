import { CommonDto } from './common.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateDepartmentDto extends PartialType(CommonDto) {}
