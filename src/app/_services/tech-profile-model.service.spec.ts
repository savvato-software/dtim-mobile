import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TechProfileModelService } from './tech-profile-model.service';

describe('TechProfileModelService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ], 
  }));

  it('should be created', () => {
    const service: TechProfileModelService = TestBed.get(TechProfileModelService);
    expect(service).toBeTruthy();
  });
});
