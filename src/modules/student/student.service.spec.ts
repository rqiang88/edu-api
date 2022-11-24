import configuration from '@/config/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { entities } from '@/core/utils/entity.util';
import { Student } from '@/entities/student.entity';
import { StudentService } from './student.service';

describe('StudentService', () => {
  let service: StudentService;
  let student: Student;

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
      providers: [StudentService]
    }).compile();
    service = module.get<StudentService>(StudentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Student Service', () => {
    it('create', async () => {
      student = await service.create({
        name: 'test1',
        sex: 'male',
        password: '123456'
      });
      expect(student).toBeInstanceOf(Student);
    });

    it('findAll', async () => {
      const params = { limit: 20, page: 1 };
      const result = await service.findAll(params);
      expect(result.data.length).toBe(1);
    });

    it('update', async () => {
      const result = await service.update(student.id, { name: 'xue' });
      expect(result).toBeInstanceOf(Student);
    });

    it('findOne', async () => {
      const result = await service.findOne(student.id);
      expect(result).toBeInstanceOf(Student);
    });

    it('remove', async () => {
      const result = await service.remove(student.id);
      expect(result.message).toBe('success');
    });
  });
});
