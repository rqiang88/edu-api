import { PartialType } from '@nestjs/swagger';
import { CommonDto } from './common.do';

export class CreateFamilyDto extends PartialType(CommonDto) {}
