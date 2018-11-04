
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudService } from '../../../services/crud.service';
import { AuthService } from '../../../services/auth.service';
import { AuthMockService } from '../../../services/auth-mock.service';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ExperimentCreateComponent } from './experiment-create.component';
import { LoginComponent } from '../../authentication/login/login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';

describe('ExperimentCreateComponent', () => {
  let component: ExperimentCreateComponent;
  let fixture: ComponentFixture<ExperimentCreateComponent>;
  let htmlElement: HTMLElement;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ExperimentCreateComponent],
      imports: [
        RouterTestingModule,
        FormsModule,
        BrowserModule
      ],
      providers: [
        AuthService,
        CrudService,
        ErrorHandlerService,
        HttpClient,
        HttpHandler
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ExperimentCreateComponent);
    component = fixture.componentInstance;

    // Call the auth mock service to have a user with an id in the
    // local storage
    const authMock = new AuthMockService();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperimentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('The form should be valid', async(() => {

    expect(component.experiment.name).toEqual(null, 'The experiment name is not null');
    expect(component.experiment.description).toEqual(null, 'The experiment description is not null');
    expect(component.experiment.startDate).toEqual(null, 'The experiment startDate is not null');
    expect(component.experiment.endDate).toEqual(null, 'The experiment endDate is not null');
  }));

  it('The createExperiment() method should be called if the \'Create Experiment\' button is clicked', async(() => {

    spyOn(component, 'createExperiment');
    htmlElement = fixture.debugElement.query(By.css('.btn.btn-success.pull-right')).nativeElement;
    htmlElement.click();
    expect(component.createExperiment).toHaveBeenCalled();
  }));

  it('The listExperiments() method should be called if the \'Back\' button is clicked', async(() => {

    spyOn(component, 'listExperiments');
    htmlElement = fixture.debugElement.query(By.css('.btn.btn-lg.btn-danger')).nativeElement;
    htmlElement.click();
    expect(component.listExperiments).toHaveBeenCalled();
  }));

  afterEach(function () {

    localStorage.removeItem('user');
  });
});
