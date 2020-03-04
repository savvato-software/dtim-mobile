import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PresentPage } from './present.page';

describe('PresentPage', () => {
  let component: PresentPage;
  let fixture: ComponentFixture<PresentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PresentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
