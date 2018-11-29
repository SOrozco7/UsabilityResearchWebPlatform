import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Experiment } from '../../../models/experiment';
import { Questionnaire } from '../../../models/questionnaire';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-questionnaire-list-for-experiment',
  templateUrl: './questionnaire-list-for-experiment.component.html',
  styleUrls: ['./questionnaire-list-for-experiment.component.css']
})
export class QuestionnaireListForExperimentComponent implements OnInit {

  experiment: Experiment;
  questionnaires: Questionnaire[];
  id: number;

  constructor(
    private errorHandler: ErrorHandlerService,
    private crud: CrudService,
    private router: Router,
    private auth: AuthService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.getThisExperimentsQuestionnaires();
  }

  getThisExperimentsQuestionnaires() {
    this.crud.retrieve(this.crud.models.EXPERIMENT, this.id)
      .subscribe(
        (res: Experiment) => {
          this.experiment = res;
          this.questionnaires = res.questionnaires;
        },
        (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        }
      );
  }

  fillQuestionnaire(id: number) {
    this.router.navigate(['experiments/' + this.id + '/questionnaires/' + id + '/fill']);
  }

  addAnotherQuestionnaire() {
    this.router.navigate(['experiments/' + this.id + '/addquestionnaire']);
  }

  retrieveExperiment() {
    this.router.navigate(['experiments/' + this.id]);
  }
}
