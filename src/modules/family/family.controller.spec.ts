import { Test, TestingModule } from '@nestjs/testing';
import { FamilyController } from './family.controller';
import { FamilyService } from './family.service';

describe('FamilyController', () => {
  let controller: FamilyController;
  const service = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn()
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FamilyController],
      providers: [
        {
          provide: FamilyService,
          useValue: service
        }
      ]
    }).compile();

    controller = module.get<FamilyController>(FamilyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Family Controller', () => {
    const data = {
      id: 1,
      name: 'hello'
    };

    it('findAll', async () => {
      const result = [data];
      service.findAll.mockResolvedValue(result);
      expect(await controller.findAll({})).toBe(result);
    });

    it('create', async () => {
      service.create.mockResolvedValue(data);
      expect(await controller.create({})).toBe(data);
    });

    it('findOne', async () => {
      service.findOne.mockResolvedValue(data);
      expect(await controller.findOne('1')).toBe(data);
    });

    it('update', async () => {
      service.update.mockResolvedValue(data);
      expect(await controller.update('1', {})).toBe(data);
    });

    it('remove', async () => {
      const result = { message: 'ok' };
      service.remove.mockResolvedValue(result);
      expect(await controller.remove('1')).toBe(result);
    });
  });
});
