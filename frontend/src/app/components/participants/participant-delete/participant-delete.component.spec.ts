import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantDeleteComponent } from './participant-delete.component';

describe('ParticipantDeleteComponent', () => {
  let component: ParticipantDeleteComponent;
  let fixture: ComponentFixture<ParticipantDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
