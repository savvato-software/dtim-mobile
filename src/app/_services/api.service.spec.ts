import { TestBed } from '@angular/core/testing';

import { Api.ServiceService } from './api.service.service';

describe('Api.ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Api.ServiceService = TestBed.get(Api.ServiceService);
    expect(service).toBeTruthy();
  });
});
