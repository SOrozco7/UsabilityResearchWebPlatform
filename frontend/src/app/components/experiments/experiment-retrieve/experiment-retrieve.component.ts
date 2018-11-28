import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Experiment } from '../../../models/experiment';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '../../../services/error-handler.service';

@Component({
  selector: 'app-experiment-retrieve',
  templateUrl: './experiment-retrieve.component.html',
  styleUrls: ['./experiment-retrieve.component.css']
})
export class ExperimentRetrieveComponent implements OnInit {

  experiment: Experiment;
  id: number;

  constructor(
    private errorHandler: ErrorHandlerService,
    private crud: CrudService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.experiment = new Experiment(null, null, null, null, null, null, 0, 0, null, null);
    this.experiment.user_id = '';

    this.id = parseInt(this.route.snapshot.paramMap.get('id'), 10);

    this.crud.retrieve(this.crud.models.EXPERIMENT, this.id)
    .subscribe(
      (res: Experiment) => {
        console.log(res);
        this.experiment = res;
        console.log(this.experiment.user_id);
      },
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    );
  }

  updateExperiment(updateID: number) {
    this.router.navigate(['experiments/update/' + updateID]);
  }

  deleteExperiment(deleteID: number) {
    this.router.navigate(['experiments/delete/' + deleteID]);
  }

  listExperiments() {

    this.router.navigate(['experiments']);
  }

  addQuestion() {

    this.router.navigate(['experiments/' + this.id + '/questions/create']);
  }
  
  listQuestions() {

    this.router.navigate(['experiments/' + this.id + '/questions']);
  }

  viewExperimentQuestionnaires() {
    this.router.navigate(['experiments/' + this.id + '/questionnaires']);
  }

  viewExperimentResponses() {

    this.router.navigate(['experiments/' + this.id + '/responses']);
  }

  runExperiment(experimentId: number) {
    const participantId = 1; // Hardcoded for now
    this.router.navigate(['experiments/run/' + experimentId + '/participants/' + participantId]);
  }
}
