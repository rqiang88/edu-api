import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DbService {
  constructor(private readonly configService: ConfigService) {}

  getConnection(): DataSource {
    return new DataSource(this.configService.get('db'));
  }
}
