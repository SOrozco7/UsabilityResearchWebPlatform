import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/models/question';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../../models/user';
import { AuthService } from '../../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '../../../services/error-handler.service';

@Component({
  selector: 'app-question-create',
  templateUrl: './question-create.component.html',
  styleUrls: ['./question-create.component.css']
})
export class QuestionCreateComponent implements OnInit {

  question: Question;
  id: number;

  constructor(
    private errorHandler: ErrorHandlerService,
    private crud: CrudService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService) { }

  ngOnInit() {
    this.question = new Question(null, null, null, null, null, null, null);
    this.question.experiment_id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
  }

  createQuestion() {

    if (this.validate()) {
      this.crud.create(this.crud.models.QUESTION, this.question)
        .subscribe(
          (res: Question) => {
            console.log(res);
            this.question = res;

            this.retrieveExperiment();
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


  retrieveExperiment() {

    this.router.navigate(['experiments/' + this.question.experiment_id]);
  }




}
