import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { AuthService } from '../../../services/auth.service';
import { RouterStub } from '../../../router-stub';
import { LoginComponent } from './login.component';
import { BrowserModule, By } from '@angular/platform-browser';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let htmlElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule],
      providers: [
        ErrorHandlerService,
        AuthService,
        HttpClient,
        HttpHandler,
        { provide: Router, useClass: RouterStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

  }));

  beforeEach(() => {
    // router = TestBed.get(Router);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("The login() method should be called if the 'Log in' button is clicked", async(() => {
    spyOn(component, "login");
    htmlElement = fixture.debugElement.query(By.css('.btn.rounded-btn')).nativeElement;
    htmlElement.click();
    expect(component.login).toHaveBeenCalled();
  }));

  it("The goToSignup() method should be called if the 'Don't have an account yet? Register here!' button is clicked", async(() => {
    spyOn(component, "goToSignup");
    htmlElement = fixture.debugElement.query(By.css('.btn.signup')).nativeElement;
    htmlElement.click();
    expect(component.goToSignup).toHaveBeenCalled();
  }));

});
