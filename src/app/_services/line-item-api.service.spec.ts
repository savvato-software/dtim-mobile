import { TestBed } from '@angular/core/testing';

import { LineItemAPIService } from './line-item-api.service';

describe('LineItemAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LineItemAPIService = TestBed.get(LineItemAPIService);
    expect(service).toBeTruthy();
  });
});
