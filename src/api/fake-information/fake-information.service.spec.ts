import { Test, TestingModule } from '@nestjs/testing';
import { FakeInformationService } from './fake-information.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '@data/schema/user.schema';
import { CourseHierarchy } from '@data/schema/courseHierarchy.schema';
import { PlatformCoupon } from '@data/schema/platformCoupon.schema';
import { CourseTag } from '@data/schema/courseTag.schema';
import { Model } from 'mongoose';

describe('FakeInformationService', () => {
  let service: FakeInformationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FakeInformationService,
        {
          provide: getModelToken(User.name),
          useValue: Model,
        },
        {
          provide: getModelToken(CourseHierarchy.name),
          useValue: Model,
        },
        {
          provide: getModelToken(PlatformCoupon.name),
          useValue: Model,
        },
        {
          provide: getModelToken(CourseTag.name),
          useValue: Model,
        },
      ],
    }).compile();

    service = module.get<FakeInformationService>(FakeInformationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
