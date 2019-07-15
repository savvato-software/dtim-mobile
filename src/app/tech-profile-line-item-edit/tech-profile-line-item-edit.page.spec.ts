import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechProfileLineItemEditPage } from './tech-profile-line-item-edit.page';

describe('TechProfileLineItemEditPage', () => {
  let component: TechProfileLineItemEditPage;
  let fixture: ComponentFixture<TechProfileLineItemEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechProfileLineItemEditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechProfileLineItemEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
