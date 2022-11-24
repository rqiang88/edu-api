import configuration from '@/config/configuration';
import { Family } from '@/entities/family.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { FamilyService } from './family.service';
import { entities } from '@/core/utils/entity.util';

describe('FamilyService', () => {
  let service: FamilyService;
  let family: Family;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: [`.env.${process.env.NODE_ENV}`],
          load: [configuration]
        }),
        TypeOrmModule.forRootAsync({
          useFactory: (configService: ConfigService) => {
            return configService.get<TypeOrmModuleAsyncOptions>('db');
          },
          inject: [ConfigService]
        }),
        TypeOrmModule.forFeature(entities)
      ],
      providers: [FamilyService]
    }).compile();

    service = module.get<FamilyService>(FamilyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Family Service', () => {
    it('create', async () => {
      family = await service.create({
        name: 'test1',
        sex: 'male',
        relation: 'jiu',
        mobile: '13585788888'
      });
      expect(family).toBeInstanceOf(Family);
    });

    it('findAll', async () => {
      const params = { limit: 20, page: 1 };
      const result = await service.findAll(params);
      expect(result.data.length).toBe(1);
    });

    it('update', async () => {
      const result = await service.update(family.id, { name: 'xue' });
      expect(result).toBeInstanceOf(Family);
    });

    it('findOne', async () => {
      const result = await service.findOne(family.id);
      expect(result).toBeInstanceOf(Family);
    });

    it('remove', async () => {
      const result = await service.remove(family.id);
      expect(result.message).toBe('success');
    });
  });
});
