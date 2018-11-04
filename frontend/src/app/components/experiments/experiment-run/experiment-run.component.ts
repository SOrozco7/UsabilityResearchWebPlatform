import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Experiment } from '../../../models/experiment';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { Question } from '../../../models/question';

@Component({
  selector: 'app-experiment-run',
  templateUrl: './experiment-run.component.html',
  styleUrls: ['./experiment-run.component.css']
})
export class ExperimentRunComponent implements OnInit {

  experimentQuestions: Question[];
  experimentId: number;

  constructor(
    private errorHandler: ErrorHandlerService,
    private crud: CrudService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.experimentId = parseInt(this.route.snapshot.paramMap.get('id'), 10);

    this.crud.retrieve(this.crud.models.EXPERIMENT, this.experimentId)
    .subscribe(
      (res: Experiment) => {
        console.log(res);
        this.experimentQuestions = res.questions;
      },
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    );
  }
}
