import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@Inject('REDIS_CLIENT') private readonly client: Redis) {}
  async get(key: string) {
    return await this.client.get(key);
  }

  async set(key: string, value: any = 'redis') {
    this.client.set(key, value);
  }

  get ioClient() {
    return this.client;
  }
}
