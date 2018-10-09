import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Experiment } from '../../../models/experiment';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Questionnaire } from '../../../models/questionnaire';
import { ErrorHandlerService } from '../../../services/error-handler.service';

@Component({
  selector: 'app-questionnaire-list',
  templateUrl: './questionnaire-list.component.html',
  styleUrls: ['./questionnaire-list.component.css']
})
export class QuestionnaireListComponent implements OnInit {

  questionnaires: Questionnaire[];

  constructor(private errorHandler: ErrorHandlerService, private crud: CrudService, private router: Router, private auth: AuthService) { }

  ngOnInit() {
    this.getAllQuestionnaires();
  }

  getAllQuestionnaires() {
    this.crud.list(this.crud.models.QUESTIONNAIRE)
      .subscribe(
        (res: Questionnaire[]) => {
          console.log(res);
          this.questionnaires = res;
        },
        (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        }
      );
  }
}
