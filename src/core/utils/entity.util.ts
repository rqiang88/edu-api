import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { readdirSync } from 'fs';
import { join } from 'path';

export const entities: EntityClassOrSchema[] = [];
const entityDir = join(process.env.PWD, 'src/entities');
readdirSync(entityDir)
  .filter(file => file.indexOf('.') && file !== 'base.entity.ts')
  .forEach(file => {
    const filePath = join(entityDir, file);
    import(filePath).then(entity => {
      entities.push(entity[Object.keys(entity)[0]]);
    });
  });

import http from 'http'