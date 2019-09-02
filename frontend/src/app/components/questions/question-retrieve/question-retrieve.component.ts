import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Experiment } from '../../../models/experiment';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { Question } from 'src/app/models/question';

@Component({
  selector: 'app-question-retrieve',
  templateUrl: './question-retrieve.component.html',
  styleUrls: ['./question-retrieve.component.css']
})
export class QuestionRetrieveComponent implements OnInit {

  experimentId: number;
  id: number;
  question: Question;

  constructor(
    private errorHandler: ErrorHandlerService,
    private crud: CrudService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.question = new Question(null, null, null, null, null, null, null);
    this.question.experiment_id = parseInt(this.route.snapshot.paramMap.get('id'), 10);

    this.id = parseInt(this.route.snapshot.paramMap.get('question_id'), 10);
    this.experimentId = parseInt(this.route.snapshot.paramMap.get('experiment_id'), 10);

    this.crud.retrieve(this.crud.models.QUESTION, this.id)
    .subscribe(
      (res: Question) => {
        console.log(res);
        this.question = res;
        console.log(this.question.experiment_id);
      },
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    );
  }

  updateQuestion() {
    this.router.navigate(['experiments/' + this.experimentId + '/questions/update/' + this.id]);
  }

  deleteQuestion() {
    this.router.navigate(['experiments/' + this.experimentId + '/questions/delete/' + this.id]);
  }

  listQuestions() {

    this.router.navigate(['experiments/' + this.experimentId + '/questions']);
  }

  addQuestion() {

    this.router.navigate(['experiments/' + this.experimentId + '/questions/create']);
  }
}
