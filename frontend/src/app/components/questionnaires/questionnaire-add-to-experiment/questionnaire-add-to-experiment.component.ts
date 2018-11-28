import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Experiment } from '../../../models/experiment';
import { Questionnaire } from '../../../models/questionnaire';
import { AuthService } from '../../../services/auth.service';
import { ErrorHandlerService } from '../../../services/error-handler.service';
/* This component displays all of the experiments that are available to add to a particular experiment. */

@Component({
  selector: 'app-questionnaire-add-to-experiment',
  templateUrl: './questionnaire-add-to-experiment.component.html',
  styleUrls: ['./questionnaire-add-to-experiment.component.css']
})
export class QuestionnaireAddToExperimentComponent implements OnInit {

  filteredQuestionnaires: Questionnaire[] = [];
  currentUserId: string;
  experiment: Experiment;
  id: number;

  constructor(
    private errorHandler: ErrorHandlerService,
    private crud: CrudService,
    private router: Router,
    private auth: AuthService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.currentUserId = this.auth.getUser().id;
    this.id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.getQuestionnairesAndFilter();
  }

  getQuestionnairesAndFilter() {
    // Get all questionnaires linked to current experiment.
    this.crud.retrieve(this.crud.models.EXPERIMENT, this.id)
      .subscribe(
        (res: Experiment) => {
          console.log(res);
          this.experiment = res;
          // Retrieves the questionnaires and filters those that fullfill both:
          // a) are public or belong to current user.
          // b) are not already linked to present experiment.
          this.crud.list(this.crud.models.QUESTIONNAIRE)
            .subscribe(
            (responseQuestionnaires: Questionnaire[]) => {
              console.log(res);
              const questionnaireIds = this.experiment.questionnaires.map(questionnaire => questionnaire.id);
              console.log('The questionnaire ids:');
              console.log(questionnaireIds);
              console.log(this.currentUserId);
              responseQuestionnaires = responseQuestionnaires.filter(questionnaire =>
                (questionnaire.isPublic || questionnaire.user_id === this.currentUserId) && !questionnaireIds.includes(questionnaire.id));
              this.filteredQuestionnaires = responseQuestionnaires;
            },
            (err: HttpErrorResponse) => {
              this.errorHandler.handleError(err);
            }
            );
          },
          (err: HttpErrorResponse) => {
            this.errorHandler.handleError(err);
          }
        );
  }

  addQuestionnaireToExperiment(questionnaire: Questionnaire) {
    // Adds the questionnaire to the experiment and then redirects to the experiment's questionnaires.
    this.crud.addBelongs(this.crud.models.EXPERIMENT, this.crud.models.QUESTIONNAIRE, this.id,
      {
        questionnaire: questionnaire,
        experiment: this.experiment
      })
      .subscribe(res => {
        console.log('Successfully added.');
        this.router.navigate(['experiments/' + this.id + '/questionnaires']);
      },
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      });
  }

  navigateToCreateQuestionnaire() {
    this.router.navigate(['questionnaires/create']);
  }
}
