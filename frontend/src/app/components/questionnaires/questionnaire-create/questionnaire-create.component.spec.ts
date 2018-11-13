import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudService } from '../../../services/crud.service';
import { AuthService } from '../../../services/auth.service';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../../../material.module';

import { QuestionnaireCreateComponent } from './questionnaire-create.component';

describe('QuestionnaireCreateComponent', () => {
  let component: QuestionnaireCreateComponent;
  let fixture: ComponentFixture<QuestionnaireCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionnaireCreateComponent ],
      imports: [
        RouterTestingModule,
        FormsModule,
        BrowserModule,
        MaterialModule,
        ReactiveFormsModule
      ],
      providers: [
        AuthService,
        CrudService,
        ErrorHandlerService,
        HttpClient,
        HttpHandler
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
