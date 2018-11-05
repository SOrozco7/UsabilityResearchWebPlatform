import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireCreateComponent } from './questionnaire-create.component';

describe('QuestionnaireCreateComponent', () => {
  let component: QuestionnaireCreateComponent;
  let fixture: ComponentFixture<QuestionnaireCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionnaireCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
