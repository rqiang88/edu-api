import { Test, TestingModule } from '@nestjs/testing';
import { ExportController } from './export.controller';
import { ExportService } from './export.service';

describe('ExportController', () => {
  let controller: ExportController;
  const service = {
    exportSchool: jest.fn(),
    exportTeacher: jest.fn(),
    exportStudent: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExportController],
      providers: [
        {
          provide: ExportService,
          useValue: service
        }
      ]
    }).compile();

    controller = module.get<ExportController>(ExportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Export Controller', () => {
    const result = { url: 'http://www.xuntian.com' };
    it('exportSchool', async () => {
      service.exportSchool.mockResolvedValue(result);
      expect(await controller.exportSchool({})).toBe(result);
    });

    it('exportTeacher', async () => {
      service.exportTeacher.mockResolvedValue(result);
      expect(await controller.exportTeacher({})).toBe(result);
    });

    it('exportStudent', async () => {
      service.exportStudent.mockResolvedValue(result);
      expect(await controller.exportStudent({})).toBe(result);
    });
  });
});
