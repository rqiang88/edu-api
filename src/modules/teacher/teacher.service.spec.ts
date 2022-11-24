import configuration from '@/config/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { entities } from '@/core/utils/entity.util';
import { TeacherService } from './teacher.service';
import { Teacher } from '@/entities/teacher.entity';

describe('TeacherService', () => {
  let service: TeacherService;
  let teacher: Teacher;

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
      providers: [TeacherService]
    }).compile();
    service = module.get<TeacherService>(TeacherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Service', () => {
    it('create', async () => {
      teacher = await service.create({
        name: 'test1',
        sex: 'male',
        password: '123456',
        mobile: '13588888888',
        cardNo: '362426198910120888'
      });
      expect(teacher).toBeInstanceOf(Teacher);
    });

    it('findAll', async () => {
      const params = { limit: 20, page: 1 };
      const result = await service.findAll(params);
      expect(result.data.length).toBe(1);
    });

    it('update', async () => {
      const result = await service.update(teacher.id, { name: 'xue' });
      expect(result).toBeInstanceOf(Teacher);
    });

    it('findOne', async () => {
      const result = await service.findOne(teacher.id);
      expect(result).toBeInstanceOf(Teacher);
    });

    it('remove', async () => {
      const result = await service.remove(teacher.id);
      expect(result.message).toBe('success');
    });
  });
});
