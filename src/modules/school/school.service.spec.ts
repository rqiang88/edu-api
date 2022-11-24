import { Teacher } from '@/entities/teacher.entity';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import configuration from '@/config/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { SchoolService } from './school.service';
import { School } from '@/entities/school.entity';

describe('SchoolService', () => {
  let service: SchoolService;
  let school: School;

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
        TypeOrmModule.forFeature([School, Teacher])
      ],
      providers: [SchoolService]
    }).compile();
    service = module.get<SchoolService>(SchoolService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('School Service', () => {
    it('create', async () => {
      school = await service.create({
        name: 'test1',
        shortName: 'test1',
        description: 'test1'
      });
      expect(school).toBeInstanceOf(School);
    });

    it('findAll', async () => {
      const params = { limit: 20, page: 1 };
      const result = await service.findAll(params);
      expect(result.data.length).toBe(1);
    });

    it('update', async () => {
      const result = await service.update(school.id, { name: 'xue' });
      expect(result).toBeInstanceOf(School);
    });

    it('findOne', async () => {
      const result = await service.findOne(school.id);
      expect(result).toBeInstanceOf(School);
    });

    it('remove', async () => {
      const result = await service.remove(school.id);
      expect(result.message).toBe('success');
    });
  });
});
