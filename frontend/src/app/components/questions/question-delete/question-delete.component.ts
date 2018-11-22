import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { Question } from 'src/app/models/question';

@Component({
  selector: 'app-question-delete',
  templateUrl: './question-delete.component.html',
  styleUrls: ['./question-delete.component.css']
})
export class QuestionDeleteComponent implements OnInit {

  experimentId: number;

  constructor(
    private errorHandler: ErrorHandlerService,
    private crud: CrudService,
    private router: Router,
    private auth: AuthService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('question_id'), 10);
    this.experimentId = parseInt(this.route.snapshot.paramMap.get('experiment_id'), 10);

    console.log('Deleting');
    this.crud.delete(this.crud.models.QUESTION, id)
    .subscribe(
      (res: Response) => {
        this.errorHandler.showInformativeMessage('Successfully deleted question.');
        this.listQuestions();
      },
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    );
  }

  listQuestions() {

    this.router.navigate(['experiments/' + this.experimentId + '/questions']);
  }

}
