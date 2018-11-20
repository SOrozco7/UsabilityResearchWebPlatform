import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { CrudService } from '../../../services/crud.service';
import { AuthService } from '../../../services/auth.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { QuestionDeleteComponent } from './question-delete.component';

describe('QuestionDeleteComponent', () => {
  let component: QuestionDeleteComponent;
  let fixture: ComponentFixture<QuestionDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionDeleteComponent ],
      imports: [ RouterTestingModule, FormsModule ],
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
    fixture = TestBed.createComponent(QuestionDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
