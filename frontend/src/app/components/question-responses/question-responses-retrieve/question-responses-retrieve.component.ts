import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CrudService } from '../../../services/crud.service';
import { Participant } from '../../../models/participant';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-question-responses-retrieve',
  templateUrl: './question-responses-retrieve.component.html',
  styleUrls: ['./question-responses-retrieve.component.css']
})
export class QuestionResponsesRetrieveComponent implements OnInit {

  experimentId: number;
  participant: Participant;
  currQuestionIndex: number;
  currYouTubeVideoURL: SafeUrl;

  constructor(
    private route: ActivatedRoute,
    private errorHandler: ErrorHandlerService,
    private crud: CrudService,
    private router: Router,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit() {

    this.experimentId = parseInt(this.route.snapshot.paramMap.get('experiment_id'), 10);
    this.participant = new Participant("", -1, "", "", "", -1, null, null, -1, null);
    this.participant.id = parseInt(this.route.snapshot.paramMap.get('participant_id'), 10);
    this.participant.questionresponses = [];
    this.currQuestionIndex = 0;

    this.crud.retrieve(this.crud.models.PARTICIPANT, this.participant.id)
    .subscribe(
      (res: Participant) => {

        this.participant = new Participant(res.name, res.age, res.gender, res.ethnicGroup, res.educationLevel, res.experiment_id, null, null, res.id, res.questionresponses);
        this.participant.sortQuestionResponsesArray();
      },
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    );
  }
  
  setCurrQuestion(questionIndex){

    this.currQuestionIndex = questionIndex;
  }

  getCurrYouTubeVideoURL(){

    let videoId = this.participant.questionresponses[this.currQuestionIndex].videoId;
    return this.domSanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + videoId);
  }

  retrieveQuestionResponses(){

    this.router.navigate(['experiments/' + this.experimentId + '/responses']);
  }
}
