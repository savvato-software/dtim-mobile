import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AttendanceModelService } from './attendance-model.service';

describe('AttendanceModelService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ], 
  }));

  it('should be created', () => {
    const service: AttendanceModelService = TestBed.get(AttendanceModelService);
    expect(service).toBeTruthy();
  });
});
