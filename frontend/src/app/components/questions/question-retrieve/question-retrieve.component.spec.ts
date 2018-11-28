import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { CrudService } from '../../../services/crud.service';
import { AuthService } from '../../../services/auth.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { QuestionRetrieveComponent } from './question-retrieve.component';
import { BrowserModule, By } from '@angular/platform-browser';

describe('QuestionRetrieveComponent', () => {
  let component: QuestionRetrieveComponent;
  let fixture: ComponentFixture<QuestionRetrieveComponent>;
  let htmlElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionRetrieveComponent ],
      imports: [RouterTestingModule, FormsModule],
      providers: [
        AuthService,
        CrudService,
        ErrorHandlerService,
        HttpClient,
        HttpHandler
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionRetrieveComponent);
    component = fixture.componentInstance;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionRetrieveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('The listQuestions() method should be called if the \'Back\' button is clicked', async(() => {

    spyOn(component, 'listQuestions');
    htmlElement = fixture.debugElement.query(By.css('.btn.btn-lg.btn-danger.back')).nativeElement;
    htmlElement.click();
    expect(component.listQuestions).toHaveBeenCalled();
  }));

  it('The updateQuestion() method should be called if the \'Edit\' button is clicked', async(() => {

    spyOn(component, 'updateQuestion');
    htmlElement = fixture.debugElement.query(By.css('.btn.btn-lg.btn-success')).nativeElement;
    htmlElement.click();
    expect(component.updateQuestion).toHaveBeenCalled();
  }));

  it('The deleteQuestion() method should be called if the \'Delete\' button is clicked', async(() => {

    spyOn(component, 'deleteQuestion');
    htmlElement = fixture.debugElement.query(By.css('.btn.btn-lg.btn-danger.delete')).nativeElement;
    htmlElement.click();
    expect(component.deleteQuestion).toHaveBeenCalled();
  }));

});
