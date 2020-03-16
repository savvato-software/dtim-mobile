import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { FunctionPromiseService } from '@savvato-software/savvato-javascript-services';

import { QuestionDisplayPage } from './question-display.page';

describe('QuestionDisplayPage', () => {
  let component: QuestionDisplayPage;
  let fixture: ComponentFixture<QuestionDisplayPage>;
  let router: Router;  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      declarations: [ QuestionDisplayPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [ FunctionPromiseService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionDisplayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.get(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
