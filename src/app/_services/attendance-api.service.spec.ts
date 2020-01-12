import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AttendanceAPIService } from './attendance-api.service';

describe('AttendanceAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ], 
  }));

  it('should be created', () => {
    const service: AttendanceAPIService = TestBed.get(AttendanceAPIService);
    expect(service).toBeTruthy();
  });
});
