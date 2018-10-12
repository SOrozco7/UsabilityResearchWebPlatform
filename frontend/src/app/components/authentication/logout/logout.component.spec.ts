import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { AuthService } from '../../../services/auth.service';
import { RouterStub } from '../../../router-stub';
import { LogoutComponent } from './logout.component';

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LogoutComponent],
      imports: [FormsModule],
      providers: [
        ErrorHandlerService,
        AuthService,
        HttpClient,
        HttpHandler,
        {provide: Router, useClass: RouterStub}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    // router = TestBed.get(Router);
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
