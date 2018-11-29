import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Questionnaire } from '../../../models/questionnaire';
import { ErrorHandlerService } from '../../../services/error-handler.service';

@Component({
  selector: 'app-questionnaire-retrieve',
  templateUrl: './questionnaire-retrieve.component.html',
  styleUrls: ['./questionnaire-retrieve.component.css']
})
export class QuestionnaireRetrieveComponent implements OnInit {

  id: number;
  questionnaire: Questionnaire;

  constructor( private errorHandler: ErrorHandlerService,
    private crud: CrudService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.getQuestionnaire();
  }

  getQuestionnaire() {
    this.crud.retrieve(this.crud.models.QUESTIONNAIRE, this.id)
      .subscribe(
        (res: Questionnaire) => {
          console.log(res);
          this.questionnaire = res;
        },
        (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        }
      );
  }

  listQuestionnaires() {
    this.router.navigate(['questionnaires']);
  }

  createQuestionnaireQuestion() {
    this.router.navigate(['questionnaires/' + this.id + '/questions/create']);
  }
}
