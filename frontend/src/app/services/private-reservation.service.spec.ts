import { TestBed } from '@angular/core/testing';

import { PrivateReservationService } from './private-reservation.service';

describe('PrivateReservationService', () => {
  let service: PrivateReservationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrivateReservationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
