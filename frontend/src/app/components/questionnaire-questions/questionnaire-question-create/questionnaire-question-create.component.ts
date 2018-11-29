import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Experiment } from '../../../models/experiment';
import { Questionnaire } from '../../../models/questionnaire';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { QuestionnaireQuestion } from '../../../models/questionnaire-question';
import { NgxNotificationService } from 'ngx-notification';

@Component({
  selector: 'app-questionnaire-question-create',
  templateUrl: './questionnaire-question-create.component.html',
  styleUrls: ['./questionnaire-question-create.component.css'],
  animations: []
})
export class QuestionnaireQuestionCreateComponent implements OnInit {

  id: number;
  question: QuestionnaireQuestion;

  constructor(
    private errorHandler: ErrorHandlerService,
    private crud: CrudService,
    private router: Router,
    private auth: AuthService,
    private route: ActivatedRoute,
    private ngxNotificationService: NgxNotificationService) { }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.question = new QuestionnaireQuestion(null, this.id);
    this.sendNotification("TEST ", "success", "bottom-left");
  }

  createQuestionnaireQuestion() {
    if (this.question.text != null) {
      this.crud.create(this.crud.models.QUESTIONNAIRE_QUESTION, this.question)
        .subscribe((res: QuestionnaireQuestion) => {
          console.log('Question successfully created');
          this.sendNotification('Question successfully created.', 'success', 'bottom-left');
          this.retrieveQuestionnaire();
        },
        (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        });
    } else {
      console.log('The questionnaire question text is missing');
      this.sendNotification('The text field is missing. Please fill and try again.', 'danger', 'bottom-left');
    }
  }

  retrieveQuestionnaire() {
    this.router.navigate(['questionnaires/' + this.id]);
  }

  sendNotification(message, color, position) {

    this.ngxNotificationService.sendMessage(message, color, position);
  }
}
