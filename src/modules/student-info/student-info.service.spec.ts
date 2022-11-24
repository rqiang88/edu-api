import { StudentInfo } from '@/entities/student-info.entity';
import configuration from '@/config/configuration';
import { entities } from '@/core/utils/entity.util';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { StudentInfoService } from './student-info.service';

describe('StudentInfoService', () => {
  let service: StudentInfoService;
  let studentInfo: StudentInfo;

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
      providers: [StudentInfoService]
    }).compile();

    service = module.get<StudentInfoService>(StudentInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Student Service', () => {
    it('create', async () => {
      studentInfo = await service.create({
        state: 'active'
      });
      expect(studentInfo).toBeInstanceOf(StudentInfo);
    });

    it('findAll', async () => {
      const params = { limit: 20, page: 1 };
      const result = await service.findAll(params);
      expect(result.data.length).toBe(1);
    });

    it('update', async () => {
      const result = await service.update(studentInfo.id, {
        state: 'unactive'
      });
      expect(result).toBeInstanceOf(StudentInfo);
    });

    it('findOne', async () => {
      const result = await service.findOne(studentInfo.id);
      expect(result).toBeInstanceOf(StudentInfo);
    });

    it('remove', async () => {
      const result = await service.remove(studentInfo.id);
      expect(result.message).toBe('success');
    });
  });
});
