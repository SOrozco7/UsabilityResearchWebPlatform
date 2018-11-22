import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ScriptService } from '../../../services/script.service';
import { CrudService } from '../../../services/crud.service';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { VideoUploadComponent } from './video-upload.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxNotificationService, NgxNotificationComponent } from 'ngx-notification';
import { AuthService } from '../../../services/auth.service';

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
        CrudService,
        ErrorHandlerService,
        AuthService,
        HttpClient,
        HttpHandler
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
