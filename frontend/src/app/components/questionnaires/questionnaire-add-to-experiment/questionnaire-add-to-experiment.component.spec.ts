import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { AuthService } from '../../../services/auth.service';
import { CrudService } from '../../../services/crud.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AuthMockService } from '../../../services/auth-mock.service';
import { RouterTestingModule } from '@angular/router/testing';
import { QuestionnaireAddToExperimentComponent } from './questionnaire-add-to-experiment.component';

describe('QuestionnaireAddToExperimentComponent', () => {
  let component: QuestionnaireAddToExperimentComponent;
  let fixture: ComponentFixture<QuestionnaireAddToExperimentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionnaireAddToExperimentComponent ],
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
    const authMock = new AuthMockService();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireAddToExperimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
