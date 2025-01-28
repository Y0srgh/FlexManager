import { Test, TestingModule } from '@nestjs/testing';
import { SitePaymentController } from './site-payment.controller';
import { SitePaymentService } from './site-payment.service';

describe('SitePaymentController', () => {
  let controller: SitePaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SitePaymentController],
      providers: [SitePaymentService],
    }).compile();

    controller = module.get<SitePaymentController>(SitePaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
