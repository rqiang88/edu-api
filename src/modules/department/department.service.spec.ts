import { Department } from '@/entities/department.entity';
import configuration from '@/config/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { DepartmentService } from './department.service';

describe('DepartmentService', () => {
  let service: DepartmentService;
  let department: Department;

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
        TypeOrmModule.forFeature([Department])
      ],
      providers: [DepartmentService]
    }).compile();

    service = module.get<DepartmentService>(DepartmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Department Service', () => {
    it('create', async () => {
      department = await service.create({
        name: 'test1',
        state: 'active'
      });
      expect(department).toBeInstanceOf(Department);
    });

    it('findAll', async () => {
      const params = { limit: 20, page: 1 };
      const result = await service.findAll(params);
      expect(result.data.length).toBe(1);
    });

    it('update', async () => {
      const result = await service.update(department.id, { name: 'xue' });
      expect(result).toBeInstanceOf(Department);
    });

    it('findOne', async () => {
      const result = await service.findOne(department.id);
      expect(result).toBeInstanceOf(Department);
    });

    it('remove', async () => {
      const result = await service.remove(department.id);
      expect(result.message).toBe('success');
    });
  });
});
