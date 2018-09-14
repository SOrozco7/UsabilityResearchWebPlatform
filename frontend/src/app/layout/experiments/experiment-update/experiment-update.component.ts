import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Experiment } from '../../../models/experiment';
import { User } from '../../../models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '../../../services/error-handler.service';

@Component({
  selector: 'app-experiment-update',
  templateUrl: './experiment-update.component.html',
  styleUrls: ['./experiment-update.component.scss']
})
export class ExperimentUpdateComponent implements OnInit {

  experiment: Experiment;
  id: number;

  constructor(private errorHandler: ErrorHandlerService, private crud: CrudService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.experiment = new Experiment(null, null, null, null, null, null, null, null);
    this.experiment.user_id = '';

    this.id = parseInt(this.route.snapshot.paramMap.get("id"));

    this.crud.retrieve(this.crud.models.EXPERIMENT, this.id)
      .subscribe(
        (res: Experiment) => {
          console.log(res);
          this.experiment = res;
        },
        (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        }
      )
  }

  updateExperiment() {
    if (this.validate()) {
      this.crud.update(this.crud.models.EXPERIMENT, this.id, this.experiment)
        .subscribe(
          (res: Experiment) => {
            console.log(res);
            this.experiment = res;
            this.router.navigate(['experiments']);
          },
          (err: HttpErrorResponse) => {
            this.errorHandler.handleError(err);
          }
        )
    }
  }

  validate(){
    if(!this.experiment.name && !this.experiment.description && !this.experiment.startDateTime && !this.experiment.endDateTime){
      this.errorHandler.showErrorMessage('You must enter a valid value in all fields.');
      return false;
    }
    else{
      return true;
    }
  }
}