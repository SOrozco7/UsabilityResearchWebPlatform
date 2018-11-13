import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { CrudService } from '../../../services/crud.service';
import { AuthService } from '../../../services/auth.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { ExperimentRetrieveComponent } from './experiment-retrieve.component';
import { BrowserModule, By } from '@angular/platform-browser';
import { MaterialModule } from '../../../material.module';

describe('ExperimentRetrieveComponent', () => {
  let component: ExperimentRetrieveComponent;
  let fixture: ComponentFixture<ExperimentRetrieveComponent>;
   let htmlElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExperimentRetrieveComponent],
      imports: [RouterTestingModule, FormsModule, MaterialModule],
      providers: [
        AuthService,
        CrudService,
        ErrorHandlerService,
        HttpClient,
        HttpHandler
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ExperimentRetrieveComponent);
    component = fixture.componentInstance;

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperimentRetrieveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('The listExperiments() method should be called if the \'Back\' button is clicked', async(() => {
    spyOn(component, 'listExperiments');
    htmlElement = fixture.debugElement.nativeElement.querySelector('#back-button');
    htmlElement.click();
    expect(component.listExperiments).toHaveBeenCalled();
  }));

  it('The updateExperiment() method should be called if the \'Edit\' button is clicked', async(() => {
    spyOn(component, 'updateExperiment');
    htmlElement = fixture.debugElement.nativeElement.querySelector('#update-button');
    htmlElement.click();
    expect(component.updateExperiment).toHaveBeenCalled();
  }));

  it('The deleteExperiment() method should be called if the \'Delete\' button is clicked', async(() => {
    spyOn(component, 'deleteExperiment');
    htmlElement = fixture.debugElement.nativeElement.querySelector('#delete-button');
    htmlElement.click();
    expect(component.deleteExperiment).toHaveBeenCalled();
  }));

});
