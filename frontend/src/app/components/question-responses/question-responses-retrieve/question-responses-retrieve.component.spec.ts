import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionResponsesRetrieveComponent } from './question-responses-retrieve.component';

describe('QuestionResponsesRetrieveComponent', () => {
  let component: QuestionResponsesRetrieveComponent;
  let fixture: ComponentFixture<QuestionResponsesRetrieveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionResponsesRetrieveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionResponsesRetrieveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
