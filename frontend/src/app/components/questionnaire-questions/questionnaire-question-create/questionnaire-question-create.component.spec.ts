import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { AuthService } from '../../../services/auth.service';
import { CrudService } from '../../../services/crud.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AuthMockService } from '../../../services/auth-mock.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { NgxNotificationService, NgxNotificationComponent } from 'ngx-notification';

import { QuestionnaireQuestionCreateComponent } from './questionnaire-question-create.component';

describe('QuestionnaireQuestionCreateComponent', () => {
  let component: QuestionnaireQuestionCreateComponent;
  let fixture: ComponentFixture<QuestionnaireQuestionCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionnaireQuestionCreateComponent, NgxNotificationComponent ],
      imports: [ RouterTestingModule, FormsModule ],
      providers: [
        AuthService,
        CrudService,
        ErrorHandlerService,
        HttpClient,
        HttpHandler,
        NgxNotificationService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireQuestionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
