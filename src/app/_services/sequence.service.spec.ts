import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SequenceService } from './sequence.service';

describe('SequenceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ], 
  }));

  it('should be created', () => {
    const service: SequenceService = TestBed.get(SequenceService);
    expect(service).toBeTruthy();
  });
});
