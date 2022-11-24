import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class QueueService {
  constructor(@InjectQueue('audio') private audioQueue: Queue) {}

  async add() {
    await this.audioQueue.add('transcode', { name: 'hello' });
  }
}
