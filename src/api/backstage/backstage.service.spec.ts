import { Test, TestingModule } from '@nestjs/testing';
import { BackstageService } from './backstage.service';
import { getModelToken } from '@nestjs/mongoose';
import { Order } from '@data/schema/order.schema';
import { CourseHierarchy } from '@data/schema/courseHierarchy.schema';
import { Model } from 'mongoose';

describe('BackstageService', () => {
  let service: BackstageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BackstageService,
        {
          provide: getModelToken(Order.name),
          useValue: Model, // 使用 Mongoose 的 Model 作为 mock
        },
        {
          provide: getModelToken(CourseHierarchy.name),
          useValue: Model,
        },
      ],
    }).compile();

    service = module.get<BackstageService>(BackstageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
