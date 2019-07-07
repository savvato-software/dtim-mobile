import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionEditPage } from './question-edit.page';

describe('QuestionEditPage', () => {
  let component: QuestionEditPage;
  let fixture: ComponentFixture<QuestionEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionEditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
