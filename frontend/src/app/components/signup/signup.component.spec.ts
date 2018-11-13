import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { CrudService } from '../../services/crud.service';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { AuthService } from '../../services/auth.service';
import { RouterStub } from '../../router-stub';
import { SignupComponent } from './signup.component';
import { BrowserModule, By } from '@angular/platform-browser';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let htmlElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      imports: [FormsModule],
      providers: [
        ErrorHandlerService,
        CrudService,
        AuthService,
        HttpClient,
        HttpHandler,
        {provide: Router, useClass: RouterStub}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('The User instance should be initialized with empty values.', async(() => {
    expect(component.user.firstName).toEqual('', 'The firstName attribute of the User instance is not empty.');
    expect(component.user.lastName).toEqual('', 'The lastName attribute of the User instance is not empty.');
    expect(component.user.password).toEqual('', 'The password attribute of the User instance is not empty.');
    expect(component.user.username).toEqual('', 'The username attribute of the User instance is not empty.');
    expect(component.user.id).toEqual('', 'The id attribute of the User instance is not empty.');
  }));

  it('The password confirmation field should be initialized with an empty value.', async(() => {
    expect(component.passwordConfirmation).toEqual('', 'The password confirmation field is not empty.');
  }));

  it('The signup() method should be called if the \'Sign up\' button is clicked', async(() => {
    spyOn(component, 'signup');
    htmlElement = fixture.debugElement.query(By.css('.btn.rounded-btn')).nativeElement;
    htmlElement.click();
    expect(component.signup).toHaveBeenCalled();
  }));

  it('The validation of the signup fields with empty strings should return false.', async(() => {

    expect(component.validate()).toBe(false);
  }));

  it('Two non-empty, equal passwords should be considered as a confirmed password.', async(() => {

    component.user.password = 'password';
    component.passwordConfirmation = 'password';
    expect(component.passwordWasConfirmed()).toBe(true);
  }));

  it('Two different passwords should not be considered as a confirmed password.', async(() => {

    component.user.password = 'string1';
    component.passwordConfirmation = 'string2';
    expect(component.passwordWasConfirmed()).toBe(false);
  }));

  it('Two empty passwords should not be considered as a confirmed password.', async(() => {

    component.user.password = '';
    component.passwordConfirmation = '';
    expect(component.passwordWasConfirmed()).toBe(false);
  }));

});
