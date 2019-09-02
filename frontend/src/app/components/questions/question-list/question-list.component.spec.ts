import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudService } from '../../../services/crud.service';
import { AuthService } from '../../../services/auth.service';
import { AuthMockService } from '../../../services/auth-mock.service';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { QuestionListComponent } from './question-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserModule, By } from '@angular/platform-browser';

describe('QuestionListComponent', () => {
  let component: QuestionListComponent;
  let fixture: ComponentFixture<QuestionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionListComponent ],
      imports: [RouterTestingModule],
      providers: [
        AuthService,
        CrudService,
        ErrorHandlerService,
        HttpClient,
        HttpHandler
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(QuestionListComponent);
    component = fixture.componentInstance;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
