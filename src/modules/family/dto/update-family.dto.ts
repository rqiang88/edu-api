import { PartialType } from '@nestjs/swagger';
import { CommonDto } from './common.do';

export class UpdateFamilyDto extends PartialType(CommonDto) {}
