import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturningUserPage } from './returning-user.page';

describe('ReturningUserPage', () => {
  let component: ReturningUserPage;
  let fixture: ComponentFixture<ReturningUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturningUserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturningUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
