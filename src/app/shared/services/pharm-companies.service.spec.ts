import { TestBed } from '@angular/core/testing';

import { PharmCompaniesService } from './pharm-companies.service';

describe('PharmCompaniesService', () => {
  let service: PharmCompaniesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PharmCompaniesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
