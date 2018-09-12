import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Experiment } from '../../../models/experiment';
import { User } from '../../../models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '../../../services/error-handler.service';

@Component({
  selector: 'app-experiment-retrieve',
  templateUrl: './experiment-retrieve.component.html',
  styleUrls: ['./experiment-retrieve.component.scss']
})
export class ExperimentRetrieveComponent implements OnInit {

  experiment: Experiment;
  id: number;

  constructor(private errorHandler:ErrorHandlerService, private crud:CrudService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit() {
    this.experiment = new Experiment(null, null, null, null, null, null, null, null);
    this.experiment.user_id = '';

    this.id = parseInt(this.route.snapshot.paramMap.get("id"));

    this.crud.retrieve(this.crud.models.EXPERIMENT, this.id)
    .subscribe(
      (res:Experiment)=>{
        console.log(res);
        this.experiment = res;
        console.log(this.experiment.user_id)
      },
      (err:HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    )
  }

}