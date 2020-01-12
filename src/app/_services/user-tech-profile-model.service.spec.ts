import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserTechProfileModelService } from './user-tech-profile-model.service';

describe('UserTechProfileModelService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ], 
  }));

  it('should be created', () => {
    const service: UserTechProfileModelService = TestBed.get(UserTechProfileModelService);
    expect(service).toBeTruthy();
  });
});
