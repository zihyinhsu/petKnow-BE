import { Controller } from '@nestjs/common';
import { GoldFlowService } from './gold-flow.service';

@Controller('gold-flow')
export class GoldFlowController {
  constructor(private readonly goldFlowService: GoldFlowService) {}
}
