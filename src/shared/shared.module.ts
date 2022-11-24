import { QueueModule } from './queue/queue.module';
import { QueueService } from './queue/queue.service';
import { RedisService } from './redis/redis.service';
import { RedisModule } from './redis/redis.module';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    RedisModule.register(),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => configService.get('jwt'),
      inject: [ConfigService]
    }),
    QueueModule
  ],
  providers: [JwtService, RedisService],
  exports: [JwtService, RedisService]
})
export class SharedModule {}
