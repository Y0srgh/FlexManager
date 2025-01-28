import { Test, TestingModule } from '@nestjs/testing';
import { SitePaymentService } from './site-payment.service';

describe('SitePaymentService', () => {
  let service: SitePaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SitePaymentService],
    }).compile();

    service = module.get<SitePaymentService>(SitePaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
