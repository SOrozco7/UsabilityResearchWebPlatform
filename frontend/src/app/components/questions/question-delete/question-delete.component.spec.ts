import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDeleteComponent } from './question-delete.component';

describe('QuestionDeleteComponent', () => {
  let component: QuestionDeleteComponent;
  let fixture: ComponentFixture<QuestionDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
