import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { TechProfileLineItemEditPage } from './tech-profile-line-item-edit.page';

describe('TechProfileLineItemEditPage', () => {
  let component: TechProfileLineItemEditPage;
  let fixture: ComponentFixture<TechProfileLineItemEditPage>;
  let router: Router;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      declarations: [ TechProfileLineItemEditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechProfileLineItemEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.get(Router);
    location = TestBed.get(Location);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
