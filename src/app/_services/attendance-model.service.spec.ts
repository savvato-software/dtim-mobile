import { TestBed } from '@angular/core/testing';

import { AttendanceModelService } from './attendance-model.service';

describe('AttendanceModelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AttendanceModelService = TestBed.get(AttendanceModelService);
    expect(service).toBeTruthy();
  });
});
