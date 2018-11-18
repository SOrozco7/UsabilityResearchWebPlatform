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

  experiment: Experiment;
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

    this.id = parseInt(this.route.snapshot.paramMap.get('id'), 10);

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

  updateQuestion(updateID: number) {
    this.router.navigate(['questions/update/' + updateID]);
  }

  deleteQuestion(deleteID: number) {
    this.router.navigate(['questions/delete/' + deleteID]);
  }

  listQuestions() {

    this.router.navigate(['questions']);
  }

  addQuestion() {

    this.router.navigate(['experiments/' + this.id + '/questions/create']);
  }

  // viewExperimentsQuestionnaires() {
  //   this.router.navigate(['experiments/' + this.id + '/questionnaires']);
  // }
}
