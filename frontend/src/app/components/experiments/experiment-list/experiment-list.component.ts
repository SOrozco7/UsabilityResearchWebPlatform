import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Experiment } from '../../../models/experiment';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user';
import { ErrorHandlerService } from '../../../services/error-handler.service';

@Component({
  selector: 'app-experiment-list',
  templateUrl: './experiment-list.component.html',
  styleUrls: ['./experiment-list.component.css']
})
export class ExperimentListComponent implements OnInit {

  // An array of experiments to be displayed.
  experiments: Experiment[];

  constructor(private errorHandler: ErrorHandlerService, private crud: CrudService, private router: Router, private auth: AuthService) { }

  ngOnInit() {

    this.getUserExperiments();
  }

  /**
   * Method that retrieves the user who currently is logged in. The response includes
   * the experiments that she/he owns. The experiments are then extracted from the
   * resulting JSON response to be displayed.
   */
  getUserExperiments() {

    const currUserId = this.auth.getUser().id;
    this.crud.retrieve(this.crud.models.USER, currUserId)
      .subscribe(
        (res: User) => {
          console.log(res.experiments);
          this.experiments = res.experiments;
          this.setQuestionsCounts();
          this.setParticipantsCounts();
        },
        (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        }
      );
  }

  /**
   * Method that sets the count of questions of each of the user's experiments.
   */
  setQuestionsCounts() {

    for (const currExperiment of this.experiments) {

      if (currExperiment.questions != null) {

        currExperiment.questionsCount = currExperiment.questions.length;
      } else {

        currExperiment.questionsCount = 0;
      }
    }
  }

  /**
   * Method that sets the count of participants of each of the user's experiments.
   */
  setParticipantsCounts() {

    for (const currExperiment of this.experiments) {

      if (currExperiment.participants != null) {

        currExperiment.participantsCount = currExperiment.participants.length;
      } else {

        currExperiment.participantsCount = 0;
      }
    }
  }

  /**
   * Method that takes you to the section to create an experiment.
   */
  createExperiment() {
    this.router.navigate(['experiments/create']);
  }

  /**
   * Method that retrieves an experiment.
   * @param id the id of the experiment to retrieve
   */
  retrieveExperiment(id: number) {
    this.router.navigate(['experiments/' + id]);
  }

  viewQuestionnaires() {
    this.router.navigate(['questionnaires/']);
  }

  /**
   * Method that deletes a given experiment
   * @param id the id of the experiment to deletes
   */
  deleteExperiment(id: number) {
    console.log('Deleting');
    this.crud.delete(this.crud.models.EXPERIMENT, id)
      .subscribe(
        (res: Response) => {
          this.errorHandler.showInformativeMessage('Experiment successfully deleted.');
          let x = 0;
          for (const experiment of this.experiments) {
            if (experiment.id === id) {

              this.experiments.splice(x, 1);
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
