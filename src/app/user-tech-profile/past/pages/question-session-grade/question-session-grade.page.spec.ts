import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuestionSessionGradePage } from './question-session-grade.page';

describe('QuestionSessionGradePage', () => {
  let component: QuestionSessionGradePage;
  let fixture: ComponentFixture<QuestionSessionGradePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionSessionGradePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionSessionGradePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
