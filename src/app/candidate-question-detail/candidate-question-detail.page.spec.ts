import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateQuestionDetailPage } from './candidate-question-detail.page';

describe('CandidateQuestionDetailPage', () => {
  let component: CandidateQuestionDetailPage;
  let fixture: ComponentFixture<CandidateQuestionDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateQuestionDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateQuestionDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
