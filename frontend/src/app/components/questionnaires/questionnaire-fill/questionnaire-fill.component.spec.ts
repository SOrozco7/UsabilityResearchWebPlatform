import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { CrudService } from '../../../services/crud.service';
import { AuthService } from '../../../services/auth.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { Questionnaire } from '../../../models/questionnaire';
import { QuestionnaireQuestion } from '../../../models/questionnaire-question';
import { QuestionnaireFillComponent } from './questionnaire-fill.component';

class MockCrudService {
  models = {
    QUESTIONNAIRE: 'questionnaires'
  };
  retrieve(model: string, id: any) {
    return of(new Questionnaire('SUS', '', true, null, [
      new QuestionnaireQuestion('Question 1', 1, null, null, 2),
      new QuestionnaireQuestion('Question 2', 1, null, null, 2)
    ], null, null));
  }
}

describe('QuestionnaireFillComponent', () => {
  let component: QuestionnaireFillComponent;
  let fixture: ComponentFixture<QuestionnaireFillComponent>;
  let htmlElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionnaireFillComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        AuthService,
        { provide: CrudService, useClass: MockCrudService },
        ErrorHandlerService,
        HttpClient,
        HttpHandler
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireFillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call submitResponses when Submit button is clicked', () => {
    spyOn(component, 'submitResponses');
    htmlElement = fixture.debugElement.query(By.css('.btn.btn-success')).nativeElement;
    htmlElement.click();
    expect(component.submitResponses).toHaveBeenCalled();
  });

  it('should render all questionnaires as empty', () => {
    component.getQuestionnaire();
    expect(component.answerValues.length).toBe(2);
    component.answerValues.forEach((answerValue) => expect(answerValue).toBe(null));
  });
});
