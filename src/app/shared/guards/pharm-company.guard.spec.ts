import { TestBed } from '@angular/core/testing';

import { PharmCompanyGuard } from './pharm-company.guard';

describe('PharmCompanyGuard', () => {
  let guard: PharmCompanyGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PharmCompanyGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
