import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionRetrieveComponent } from './question-retrieve.component';

describe('QuestionRetrieveComponent', () => {
  let component: QuestionRetrieveComponent;
  let fixture: ComponentFixture<QuestionRetrieveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionRetrieveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionRetrieveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
