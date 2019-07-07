import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDisplayPage } from './question-display.page';

describe('QuestionDisplayPage', () => {
  let component: QuestionDisplayPage;
  let fixture: ComponentFixture<QuestionDisplayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionDisplayPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionDisplayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
