import { StudentInfo } from '@/entities/student-info.entity';
import configuration from '@/config/configuration';
import { Grade } from '@/entities/grade.entity';
import { School } from '@/entities/school.entity';
import { Teacher } from '@/entities/teacher.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { GradeService } from './grade.service';
import { Student } from '@/entities/student.entity';

describe('GradeService', () => {
  let service: GradeService;
  let grade: Grade;

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
        TypeOrmModule.forFeature([Grade, School, Teacher, Student, StudentInfo])
        // GradeModule
      ],
      providers: [GradeService]
    }).compile();

    // const app = module.createNestApplication();
    // await app.init();
    service = module.get<GradeService>(GradeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Grade Controller', () => {
    it('create', async () => {
      grade = await service.create({
        name: 'test1'
      });
      expect(grade).toBeInstanceOf(Grade);
    });

    it('findAll', async () => {
      const params = { limit: 20, page: 1 };
      const result = await service.findAll(params);
      expect(result.data.length).toBe(1);
    });

    it('update', async () => {
      const result = await service.update(grade.id, { name: 'xue' });
      expect(result).toBeInstanceOf(Grade);
    });

    it('findOne', async () => {
      const result = await service.findOne(grade.id);
      expect(result).toBeInstanceOf(Grade);
    });

    it('remove', async () => {
      const result = await service.remove(grade.id);
      expect(result.message).toBe('success');
    });
  });
});
