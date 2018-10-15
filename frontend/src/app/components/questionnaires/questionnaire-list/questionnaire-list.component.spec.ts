import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { AuthService } from '../../../services/auth.service';
import { CrudService } from '../../../services/crud.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Questionnaire } from '../../../models/questionnaire';
import { of } from 'rxjs';

import { QuestionnaireListComponent } from './questionnaire-list.component';

class MockCrudService {
  models = {

    USER: 'users',
    EXPERIMENT: 'experiments',
    QUESTIONNAIRE: 'questionnaires'
  };
  list(model: string) {
    return of([new Questionnaire('SUS', '', true, 1, null, null, 3)]);
  }
}

describe('QuestionnaireListComponent', () => {
  let component: QuestionnaireListComponent;
  let fixture: ComponentFixture<QuestionnaireListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionnaireListComponent ],
      imports: [ RouterTestingModule ],
      providers: [ ErrorHandlerService, { provide: CrudService, useClass: MockCrudService }, AuthService, HttpClient, HttpHandler ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve the list of questionnaires', () => {
    expect(component.questionnaires !== undefined).toBe(true);
    expect(component.questionnaires[0].name).toBe('SUS');
  });
});
