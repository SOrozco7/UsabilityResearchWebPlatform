import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentRunComponent } from './experiment-run.component';
import { CrudService } from '../../../services/crud.service';
import { AuthService } from '../../../services/auth.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { RecordRtcComponent } from '../../record-rtc/record-rtc.component';
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { BrowserModule } from '@angular/platform-browser';

describe('ExperimentRunComponent', () => {
  let component: ExperimentRunComponent;
  let fixture: ComponentFixture<ExperimentRunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperimentRunComponent, RecordRtcComponent],
      imports: [RouterTestingModule, BrowserModule, CommonModule, FormsModule, MaterialModule],
      providers: [

        AuthService,
        CrudService,
        ErrorHandlerService,
        HttpClient,
        HttpHandler
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ExperimentRunComponent);
    component = fixture.componentInstance;

  }));

  beforeEach(() => {
    
    fixture = TestBed.createComponent(ExperimentRunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
