import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantRetrieveComponent } from './participant-retrieve.component';

describe('ParticipantRetrieveComponent', () => {
  let component: ParticipantRetrieveComponent;
  let fixture: ComponentFixture<ParticipantRetrieveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantRetrieveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantRetrieveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
