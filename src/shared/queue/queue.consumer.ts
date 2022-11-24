import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('audio')
export class QueueConsumer {
  @Process()
  async create(job: Job<unknown>) {
    const { data } = job;
    console.log(data);
  }
}
