import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Experiment } from '../../../models/experiment';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { Question } from 'src/app/models/question';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

  // An array of questions to be displayed.
  experimentId: number;
  questions: Question[];

  constructor(
    private errorHandler: ErrorHandlerService,
    private crud: CrudService,
    private router: Router,
    private auth: AuthService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.experimentId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.getExperimentQuestions();
  }

  /**
   * Method that retrieves the user who currently is logged in. The response includes
   * the experiments that she/he owns. The experiments are then extracted from the
   * resulting JSON response to be displayed.
   */
  getExperimentQuestions() {

    this.crud.retrieve(this.crud.models.EXPERIMENT, this.experimentId)
      .subscribe(
        (res: Experiment) => {
          console.log(res.questions);
          this.questions = res.questions;
        },
        (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        }
      );
  }

  /**
   * Method that takes you to the section to create an experiment.
   */
  createExperiment() {
    this.router.navigate(['experiments/create']);
  }

  /**
   * Method that takes you to the section to create a question.
   */
  createQuestion() {
    this.router.navigate(['question/create']);
  }

  /**
   * Method that retrieves an experiment.
   * @param id the id of the experiment to retrieve
   */
  retrieveExperiment(id: number) {
    this.router.navigate(['experiments/' + id]);
  }

  /**
   * Method that retrieves an experiment.
   * @param id the id of the experiment to retrieve
   */
  retrieveQuestion(questionId: number) {
    this.router.navigate(['experiments/' + this.experimentId + '/questions/' + questionId]);
  }

  /**
   * Method that deletes a given experiment
   * @param id the id of the experiment to deletes
   */
  deleteQuestion(id: number) {
    console.log('Deleting');
    this.crud.delete(this.crud.models.QUESTION, id)
      .subscribe(
        (res: Response) => {
          this.errorHandler.showInformativeMessage('Question successfully deleted.');
          let x = 0;
          for (const question of this.questions) {
            if (question.id === id) {

              this.questions.splice(x, 1);
            }
            x++;
          }
        },
        (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        }
      );
  }
}
