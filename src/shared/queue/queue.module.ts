import { QueueService } from './queue.service';
import { QueueConsumer } from './queue.consumer';
import { BullModule } from '@nestjs/bull';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    BullModule.registerQueueAsync({
      name: 'audio',
      useFactory: (configService: ConfigService) => {
        console.log(typeof configService.get('redis').host);
        return { redis: configService.get('redis') };
      },
      inject: [ConfigService]
    })
  ],
  providers: [QueueConsumer, QueueService],
  exports: [QueueService]
})
export class QueueModule {}
