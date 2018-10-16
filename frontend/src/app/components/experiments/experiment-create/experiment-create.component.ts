import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Experiment } from '../../../models/experiment';
import { User } from '../../../models/user';
import { AuthService } from '../../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { BodyPart } from '../../../models/body-part';

@Component({
  selector: 'app-experiment-create',
  templateUrl: './experiment-create.component.html',
  styleUrls: ['./experiment-create.component.css']
})
export class ExperimentCreateComponent implements OnInit {

  experiment: Experiment;
  id: number;
  bodyPart: BodyPart;

  constructor(
    private errorHandler: ErrorHandlerService,
    private crud: CrudService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService) { }

  ngOnInit() {
    this.experiment = new Experiment(null, null, null, null, null, null, null, null);
    this.experiment.user_id = this.auth.getUser().id;
    this.bodyPart = new BodyPart(null, null, null);
  }

  createExperiment() {

    if (this.validate()) {
      this.crud.create(this.crud.models.EXPERIMENT, this.experiment)
        .subscribe(
          (res: Experiment) => {
            console.log(res);
            this.experiment = res;
            this.bodyPart.experiment_id = this.experiment.id;

            this.listExperiments();
          },
          (err: HttpErrorResponse) => {
            this.errorHandler.handleError(err);
          }
        );
    }
  }

  validate() {
    if (!this.experiment.name && !this.experiment.description && !this.experiment.startDate && !this.experiment.endDate) {
      this.errorHandler.showErrorMessage('You must enter a valid value in all fields.');
      return false;
    } else {
      return true;
    }
  }

  listExperiments() {

    this.router.navigate(['experiments']);
  }
}
