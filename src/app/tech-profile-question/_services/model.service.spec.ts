import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { FunctionPromiseService } from 'savvato-javascript-services';

import { ModelService } from './model.service';

describe('ModelService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ], 
    providers: [ FunctionPromiseService ]
  }));

  it('should be created', () => {
    const service: ModelService = TestBed.get(ModelService);
    expect(service).toBeTruthy();
  });
});
