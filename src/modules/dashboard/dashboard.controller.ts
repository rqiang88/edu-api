import { Controller, Post } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Post()
  async findAll() {
    return this.dashboardService.findAll();
  }
}
