import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Experiment } from '../../../models/experiment';
import { User } from '../../../models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { FormsModule } from '@angular/forms';
import { Question } from 'src/app/models/question';

@Component({
  selector: 'app-question-update',
  templateUrl: './question-update.component.html',
  styleUrls: ['./question-update.component.css']
})
export class QuestionUpdateComponent implements OnInit {

  experiment: Experiment;
  id: number;
  question: Question;
  experiment_id: number;

  constructor(private errorHandler: ErrorHandlerService, private crud: CrudService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.question = new Question(null, null, null, null, null, null, null);
    this.question.experiment_id = parseInt(this.route.snapshot.paramMap.get('experiment_id'), 10);

    this.id = parseInt(this.route.snapshot.paramMap.get('question_id'), 10);
    this.experiment_id = parseInt(this.route.snapshot.paramMap.get('experiment_id'), 10);

    this.crud.retrieve(this.crud.models.QUESTION, this.id)
      .subscribe(
        (res: Question) => {
          console.log(res);
          this.question = res;
        },
        (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        }
      );
  }

  updateQuestion() {
    if (this.validate()) {
      this.crud.update(this.crud.models.QUESTION, this.id, this.question)
        .subscribe(
          (res: Question) => {
            console.log('hello');
            console.log(res);
            this.question = res;
            this.router.navigate(['experiments/' + this.experiment_id + '/questions/'+this.id]);
          },
          (err: HttpErrorResponse) => {
            this.errorHandler.handleError(err);
          }
        );
    }
  }

  validate() {
    if (!this.question.text || (!this.question.initialImage && !this.question.finalImage)) {
      this.errorHandler.showErrorMessage('You must enter at least include the text of a question and a multimedia element.');
      return false;
    } else {
      return true;
    }
  }

  listExperiments() {

    this.router.navigate(['experiments']);
  }

  listQuestions() {

    this.router.navigate(['experiments/' + this.experiment_id + '/questions']);
  }

  retrieveQuestion() {

    this.router.navigate(['experiments/' + this.experiment_id + '/questions/' + this.id]);
  }
}
