import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TechProfileAPIService } from './tech-profile-api.service';

describe('TechProfileAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ], 
  }));

  it('should be created', () => {
    const service: TechProfileAPIService = TestBed.get(TechProfileAPIService);
    expect(service).toBeTruthy();
  });
});
