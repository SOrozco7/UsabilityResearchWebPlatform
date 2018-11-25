import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CrudService } from '../../../services/crud.service';
import { Participant } from '../../../models/participant';

@Component({
  selector: 'app-question-responses-retrieve',
  templateUrl: './question-responses-retrieve.component.html',
  styleUrls: ['./question-responses-retrieve.component.css']
})
export class QuestionResponsesRetrieveComponent implements OnInit {

  experimentId: number;
  participant: Participant;

  constructor(
    private route: ActivatedRoute,
    private errorHandler: ErrorHandlerService,
    private crud: CrudService,
    private router: Router,
  ) { }

  ngOnInit() {

    this.experimentId = parseInt(this.route.snapshot.paramMap.get('experiment_id'), 10);
    this.participant = new Participant("", -1, "", "", "", -1, null, null, -1, null);
    this.participant.id = parseInt(this.route.snapshot.paramMap.get('participant_id'), 10);
    this.participant.questionResponses = [];

    this.crud.retrieve(this.crud.models.PARTICIPANT, this.participant.id)
    .subscribe(
      (res: Participant) => {
        console.log("Response!");
        console.log(res);
        this.participant.questionResponses = res.questionResponses;
      },
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    );

    console.log("Participant!");
    console.log(this.participant);
  }

}
