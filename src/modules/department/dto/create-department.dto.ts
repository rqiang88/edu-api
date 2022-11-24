import { PartialType } from '@nestjs/swagger';
import { CommonDto } from './common.dto';
export class CreateDepartmentDto extends PartialType(CommonDto) {}
