import { TestBed } from '@angular/core/testing';

import { DashboardServieService } from './dashboard-servie.service';

describe('DashboardServieService', () => {
  let service: DashboardServieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardServieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
