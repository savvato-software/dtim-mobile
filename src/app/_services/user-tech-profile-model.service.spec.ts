import { TestBed } from '@angular/core/testing';

import { UserTechProfileModelService } from './user-tech-profile-model.service';

describe('UserTechProfileModelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserTechProfileModelService = TestBed.get(UserTechProfileModelService);
    expect(service).toBeTruthy();
  });
});
