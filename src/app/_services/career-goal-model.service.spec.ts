import { TestBed } from '@angular/core/testing';

import { CareerGoalModelService } from './career-goal-model.service';

describe('CareerGoalModelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CareerGoalModelService = TestBed.get(CareerGoalModelService);
    expect(service).toBeTruthy();
  });
});
