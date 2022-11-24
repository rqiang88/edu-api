import { ConfigService } from '@nestjs/config';
import { DynamicModule, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import Redis from 'ioredis';

@Module({})
export class RedisModule {
  static register(): DynamicModule {
    const client = {
      provide: 'REDIS_CLIENT',
      useFactory: (configService: ConfigService): Redis => {
        const client = new Redis(configService.get('redis'));
        return client;
      },
      inject: [ConfigService]
    };

    return {
      module: RedisModule,
      providers: [client, RedisService],
      exports: [client, RedisService]
    };
  }
}
