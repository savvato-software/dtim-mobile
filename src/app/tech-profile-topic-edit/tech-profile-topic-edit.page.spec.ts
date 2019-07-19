import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechProfileTopicEditPage } from './tech-profile-topic-edit.page';

describe('TechProfileTopicEditPage', () => {
  let component: TechProfileTopicEditPage;
  let fixture: ComponentFixture<TechProfileTopicEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechProfileTopicEditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechProfileTopicEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
