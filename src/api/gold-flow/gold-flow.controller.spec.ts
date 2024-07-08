import { Test, TestingModule } from '@nestjs/testing';
import { GoldFlowController } from './gold-flow.controller';

describe('GoldFlowController', () => {
  let controller: GoldFlowController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoldFlowController],
    }).compile();

    controller = module.get<GoldFlowController>(GoldFlowController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
