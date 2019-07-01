import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineItemActionPagePage } from './line-item-action-page.page';

describe('LineItemActionPagePage', () => {
  let component: LineItemActionPagePage;
  let fixture: ComponentFixture<LineItemActionPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineItemActionPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineItemActionPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
