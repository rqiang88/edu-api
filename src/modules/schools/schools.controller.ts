import { BaseController } from '@/lib/base.controller';
import { SchoolsService } from './schools.service';
import { CreateSchoolDto as C } from './dto/create-school.dto';
import { UpdateSchoolDto as U } from './dto/update-school.dto';
import { School } from '@/entities/school.entity';
import { Controller } from '@nestjs/common';

@Controller('schools')
export class SchoolsController extends BaseController<School, C, U> {
  constructor(private readonly shoolsService: SchoolsService) {
    super(shoolsService);
  }
}
