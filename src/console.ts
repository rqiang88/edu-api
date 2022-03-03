import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import * as repl from 'repl';

class InteractiveNestJS {
  async run() {
    // create the application context
    const targetModule = require(`${__dirname}/modules/app.module`); // eslint-disable-line
    // const targetModule = await import(`${__dirname}/src/modules/app.module`);
    const applicationContext = await NestFactory.createApplicationContext(
      // tslint:disable-next-line: no-string-literal
      targetModule['AppModule']
    );
    // const awaitOutside = ('await-outside');
    // start node repl
    const server = repl.start({
      useColors: true,
      prompt: '> ',
      ignoreUndefined: true
    });
    server.context.app = applicationContext;
    // awaitOutside.addAwaitOutsideToReplServer(server);
  }
}
const session = new InteractiveNestJS();
session.run();
