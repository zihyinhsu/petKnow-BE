import { Test, TestingModule } from '@nestjs/testing';
import { GoldFlowService } from './gold-flow.service';

describe('GoldFlowService', () => {
  let service: GoldFlowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoldFlowService],
    }).compile();

    service = module.get<GoldFlowService>(GoldFlowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
