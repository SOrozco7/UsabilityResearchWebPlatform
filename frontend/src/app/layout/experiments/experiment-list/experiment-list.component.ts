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
  styleUrls: ['./experiment-list.component.scss']
})
export class ExperimentListComponent implements OnInit {

  // An array of experiments to be displayed.
  experiments: Experiment[];

  constructor(private errorHandler: ErrorHandlerService, private crud: CrudService, private router: Router, private auth: AuthService) { }

  ngOnInit() {

    this.getUserExperiments();
  }

  /**
   * Method that retrieves the whole list of experiments.
   */
  getAllExperiments() {
    this.crud.list(this.crud.models.EXPERIMENT)
      .subscribe(
        (res: Experiment[]) => {
          console.log(res);
          this.experiments = res;
        },
        (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        }
      )
  }

  /**
   * Method that retrieves the user who currently is logged in. The response includes 
   * the experiments that she/he owns. The experiments are then extracted from the 
   * resulting JSON response to be displayed.
   */
  getUserExperiments() {
    this.crud.retrieve(this.crud.models.USER, this.auth.getUser().id)
      .subscribe(
        (res: User) => {
          console.log(res.experiments);
          this.experiments = res.experiments;
        },
        (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        }
      )
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

  /**
   * Method that deletes a given experiment
   * @param id the id of the experiment to deletes
   */
  deleteExperiment(id: number) {
    console.log("Deleting")
    this.crud.delete(this.crud.models.EXPERIMENT, id)
      .subscribe(
        (res: Response) => {
          this.errorHandler.showInformativeMessage('Experiment successfully deleted.');
          let x = 0;
          for (let experiment of this.experiments) {
            if (experiment.id == id) {

              this.experiments.splice(x, 1);
            }
            x++;
          }
        },
        (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        }
      )
  }
}