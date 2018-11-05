import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordRtcComponent } from './record-rtc.component';

describe('RecordRtcComponent', () => {
  let component: RecordRtcComponent;
  let fixture: ComponentFixture<RecordRtcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordRtcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordRtcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
