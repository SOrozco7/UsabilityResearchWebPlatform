import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RecordRtcComponent } from './record-rtc.component';
import { NgxNotificationService, NgxNotificationComponent } from 'ngx-notification';

describe('RecordRtcComponent', () => {
  let component: RecordRtcComponent;
  let fixture: ComponentFixture<RecordRtcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        RecordRtcComponent,
        NgxNotificationComponent 
      ],
      providers: [
        NgxNotificationService
      ]
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
