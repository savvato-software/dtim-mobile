import { TestBed } from '@angular/core/testing';

import { TechProfileAPIService } from './tech-profile-api.service';

describe('TechProfileAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TechProfileAPIService = TestBed.get(TechProfileAPIService);
    expect(service).toBeTruthy();
  });
});
