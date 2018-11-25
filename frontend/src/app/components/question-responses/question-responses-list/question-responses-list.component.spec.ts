import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionResponsesListComponent } from './question-responses-list.component';

describe('QuestionResponsesListComponent', () => {
  let component: QuestionResponsesListComponent;
  let fixture: ComponentFixture<QuestionResponsesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionResponsesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionResponsesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
