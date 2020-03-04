import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PastUserTechProfilePage } from './past.page';

describe('PastUserTechProfilePage', () => {
  let component: PastUserTechProfilePage;
  let fixture: ComponentFixture<PastUserTechProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastUserTechProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PastUserTechProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
