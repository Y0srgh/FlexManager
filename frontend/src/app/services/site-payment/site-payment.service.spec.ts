import { TestBed } from '@angular/core/testing';

import { SitePaymentService } from './site-payment.service';

describe('SitePaymentService', () => {
  let service: SitePaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SitePaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
