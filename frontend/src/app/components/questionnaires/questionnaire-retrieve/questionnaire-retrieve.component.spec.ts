import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { AuthService } from '../../../services/auth.service';
import { CrudService } from '../../../services/crud.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AuthMockService } from '../../../services/auth-mock.service';
import { RouterTestingModule } from '@angular/router/testing';
import { QuestionnaireRetrieveComponent } from './questionnaire-retrieve.component';

describe('QuestionnaireRetrieveComponent', () => {
  let component: QuestionnaireRetrieveComponent;
  let fixture: ComponentFixture<QuestionnaireRetrieveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionnaireRetrieveComponent ],
      imports: [ RouterTestingModule ],
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
    fixture = TestBed.createComponent(QuestionnaireRetrieveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
