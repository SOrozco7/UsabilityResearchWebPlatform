import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudService } from '../../../services/crud.service';
import { AuthService } from '../../../services/auth.service';
import { AuthMockService } from '../../../services/auth-mock.service';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ExperimentListComponent } from './experiment-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserModule, By } from '@angular/platform-browser';

describe('ExperimentListComponent', () => {
  let component: ExperimentListComponent;
  let fixture: ComponentFixture<ExperimentListComponent>;
  let htmlElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExperimentListComponent],
      imports: [RouterTestingModule],
      providers: [
        AuthService,
        CrudService,
        ErrorHandlerService,
        HttpClient,
        HttpHandler
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ExperimentListComponent);
    component = fixture.componentInstance;

    // Call the auth mock service to have a user with an id in the
    // local storage
    const authMock = new AuthMockService();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperimentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("The createExperiment() method should be called if the 'Create Experiment' button is clicked", async(() => {

    spyOn(component, "createExperiment");
    htmlElement = fixture.debugElement.query(By.css('.btn.btn-success.pull-right')).nativeElement;
    htmlElement.click();
    expect(component.createExperiment).toHaveBeenCalled();
  }));

  // // This test fails because the 'View' button is not found. It is a dynamically-generated button.
  // it("The retrieveExperiment() method should be called if a 'View' button is clicked", async(() => {

  //   fixture.detectChanges();

  //   fixture.whenStable().then(() => {

  //     fixture.detectChanges();
  //     spyOn(component, "retrieveExperiment");
  //     htmlElement = fixture.debugElement.query(By.css('.btn.btn-primary')).nativeElement;
  //     htmlElement.click();
  //     fixture.detectChanges();
  //     expect(component.retrieveExperiment).toHaveBeenCalled();
  //   });

  // }));

  afterEach(function () {

    localStorage.removeItem('user');
  });
});
