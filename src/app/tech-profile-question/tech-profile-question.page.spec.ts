import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechProfileQuestionPage } from './tech-profile-question.page';

describe('TechProfileQuestionPage', () => {
  let component: TechProfileQuestionPage;
  let fixture: ComponentFixture<TechProfileQuestionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechProfileQuestionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechProfileQuestionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
