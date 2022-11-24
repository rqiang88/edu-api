import configuration from '@/config/configuration';
import { entities } from '@/core/utils/entity.util';
import { TeacherInfo } from '@/entities/teacher-info.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { TeacherInfoService } from './teacher-info.service';

describe('TeacherInfoService', () => {
  let service: TeacherInfoService;
  let teacherInfo: TeacherInfo;

  beforeEach(async () => {
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
      providers: [TeacherInfoService]
    }).compile();

    service = module.get<TeacherInfoService>(TeacherInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('teacher Service', () => {
    it('create', async () => {
      teacherInfo = await service.create({
        teacherId: 1,
        state: 'active'
      });
      expect(teacherInfo).toBeInstanceOf(TeacherInfo);
    });

    it('findAll', async () => {
      const params = { limit: 20, page: 1 };
      const result = await service.findAll(params);
      expect(result.data.length).toBe(1);
    });

    it('update', async () => {
      const result = await service.update(teacherInfo.id, {
        state: 'unactive'
      });
      expect(result).toBeInstanceOf(TeacherInfo);
    });

    it('findOne', async () => {
      const result = await service.findOne(teacherInfo.id);
      expect(result).toBeInstanceOf(TeacherInfo);
    });

    it('remove', async () => {
      const result = await service.remove(teacherInfo.id);
      expect(result.message).toBe('success');
    });
  });
});
