import { PartialType } from '@nestjs/swagger';
import { CommonDto } from './common.dto';

export class UpdateDepartmentDto extends PartialType(CommonDto) {}
