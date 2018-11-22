import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { ScriptService } from '../../../services/script.service';
import { VideoUploadComponent } from './video-upload.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxNotificationService, NgxNotificationComponent } from 'ngx-notification';

describe('VideoUploadComponent', () => {

  const fakeActivatedRoute = {
    snapshot: { data: { } }
  } as ActivatedRoute;

  let component: VideoUploadComponent;
  let fixture: ComponentFixture<VideoUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VideoUploadComponent,
        NgxNotificationComponent
      ],
      imports: [

        RouterTestingModule
      ],
      providers: [
        NgxNotificationService,
        ScriptService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
