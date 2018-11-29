import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { CrudService } from '../../../services/crud.service';
import { AuthService } from '../../../services/auth.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { QuestionUpdateComponent } from './question-update.component';
import { BrowserModule, By } from '@angular/platform-browser';

describe('QuestionUpdateComponent', () => {
  let component: QuestionUpdateComponent;
  let fixture: ComponentFixture<QuestionUpdateComponent>;
  let htmlElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionUpdateComponent ],
      imports: [
        RouterTestingModule,
        FormsModule,
        BrowserModule
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

    fixture = TestBed.createComponent(QuestionUpdateComponent);
    component = fixture.componentInstance;

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('The updateQuestion() method should be called if the \'Save changes\' button is clicked', async(() => {

    spyOn(component, 'updateQuestion');
    htmlElement = fixture.debugElement.query(By.css('.btn.btn-success.pull-right')).nativeElement;
    htmlElement.click();
    expect(component.updateQuestion).toHaveBeenCalled();
  }));

  it('The listQuestions() method should be called if the \'Back\' button is clicked', async(() => {

    spyOn(component, 'listQuestions');
    htmlElement = fixture.debugElement.query(By.css('.btn.btn-lg.btn-danger')).nativeElement;
    htmlElement.click();
    expect(component.listQuestions).toHaveBeenCalled();
  }));

});
