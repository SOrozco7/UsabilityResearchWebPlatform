import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { CrudService } from '../../../services/crud.service';
import { AuthService } from '../../../services/auth.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { ExperimentUpdateComponent } from './experiment-update.component';
import { BrowserModule, By } from '@angular/platform-browser';

describe('ExperimentUpdateComponent', () => {
  let component: ExperimentUpdateComponent;
  let fixture: ComponentFixture<ExperimentUpdateComponent>;
  let htmlElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperimentUpdateComponent ],
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

    fixture = TestBed.createComponent(ExperimentUpdateComponent);
    component = fixture.componentInstance;

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperimentUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("The updateExperiment() method should be called if the 'Save changes' button is clicked", async(() => {

    spyOn(component, "updateExperiment");
    htmlElement = fixture.debugElement.query(By.css('.btn.btn-success.pull-right')).nativeElement;
    htmlElement.click();
    expect(component.updateExperiment).toHaveBeenCalled();
  }));

  it("The listExperiments() method should be called if the 'Back' button is clicked", async(() => {

    spyOn(component, "listExperiments");
    htmlElement = fixture.debugElement.query(By.css('.btn.btn-lg.btn-danger')).nativeElement;
    htmlElement.click();
    expect(component.listExperiments).toHaveBeenCalled();
  }));

});
