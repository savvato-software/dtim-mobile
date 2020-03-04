import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllUserSessionsListingPage } from './all-user-sessions-listing.page';

describe('AllUserSessionsListingPage', () => {
  let component: AllUserSessionsListingPage;
  let fixture: ComponentFixture<AllUserSessionsListingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllUserSessionsListingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllUserSessionsListingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
