import { Family } from '@/entities/family.entity';
import { Controller } from '@nestjs/common';
import { FamiliesService } from './families.service';
import { CreateFamilyDto as C } from './dto/create-family.dto';
import { UpdateFamilyDto as U } from './dto/update-family.dto';
import { QueryFamilyDto as Q } from './dto/query-family.dto';
import { BaseController } from '@/lib/base.controller';

@Controller('families')
export class FamiliesController extends BaseController<Family, C, U, Q> {
  constructor(private readonly familiesService: FamiliesService) {
    super(familiesService);
  }
}
