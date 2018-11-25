import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantSelectionComponent } from './participant-selection.component';

describe('ParticipantSelectionComponent', () => {
  let component: ParticipantSelectionComponent;
  let fixture: ComponentFixture<ParticipantSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
