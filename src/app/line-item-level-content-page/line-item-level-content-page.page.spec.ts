import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineItemLevelContentPagePage } from './line-item-level-content-page.page';

describe('LineItemLevelContentPagePage', () => {
  let component: LineItemLevelContentPagePage;
  let fixture: ComponentFixture<LineItemLevelContentPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineItemLevelContentPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineItemLevelContentPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
