import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { Experiment } from '../../../models/experiment';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-experiment-create',
  templateUrl: './experiment-create.component.html',
  styleUrls: ['./experiment-create.component.css']
})
export class ExperimentCreateComponent implements OnInit {

  name: string;
  startDate: Date;
  endDate: Date;
  description: string;

  constructor(private crud: CrudService, private router: Router, private errorHandler: ErrorHandlerService, private auth: AuthService) { }

  ngOnInit() {
  }

  createExperiment() {
    console.log("Creating experiment");

    let body = {
      id: null,
      name: this.name,
      description: this.description,
      startDate: this.startDate,
      endDate: this.endDate,
      user_id: this.auth.getUser()
    };
    if (this.validate()) {
      this.crud.create(this.crud.models.EXPERIMENT, body)
        .subscribe(
          (res: Experiment) => {
            this.errorHandler.showInformativeMessage("Experiment successfully created");
            this.router.navigate(['experiments']);
          },
          (err) => {
            this.errorHandler.handleError(err);
          }
        );
    }
  }

  validate() {
    if (!this.name) {
      this.errorHandler.showErrorMessage("You must give your experiment a name.");
      return false;
    }

    if (!this.startDate) {
      this.errorHandler.showErrorMessage("You must provide a start date for the experiment.");
      return false;
    }

    if (!this.endDate) {
      this.errorHandler.showErrorMessage("You must provide an end date for the experiment.");
      return false;
    }

    if (this.startDate > this.endDate) {
      this.errorHandler.showErrorMessage("The start date must be before the end date.");
      return false;
    }

    return true;
  }
}
