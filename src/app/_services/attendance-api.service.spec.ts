import { TestBed } from '@angular/core/testing';

import { AttendanceAPIService } from './attendance-api.service';

describe('AttendanceAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AttendanceAPIService = TestBed.get(AttendanceAPIService);
    expect(service).toBeTruthy();
  });
});
