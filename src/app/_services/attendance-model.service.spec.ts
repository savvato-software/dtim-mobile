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

  describe('isSessionActive', () => {
  	it('given multiple calls, should only call the API once', () => {
  		
  	})

  	it('should return null when called before the API call returns', () => {
  		
  	})

  	it('should indicate a session is active when called within three hours of the start time of the last session', () => {
  		
  	})
  })
});
