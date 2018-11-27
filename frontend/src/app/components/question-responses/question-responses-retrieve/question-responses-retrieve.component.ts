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
    const participantId = parseInt(this.route.snapshot.paramMap.get('participant_id'), 10);

    // This line is required to be able to initialize the questionresponses array.
    this.participant = new Participant("", -1, "", "", "", -1, null, null, -1, null);

    // This line is required because if the initialization of the questionresponses array
    // is not made, the Karma test fails.
    this.participant.questionresponses = [];
    
    this.currQuestionIndex = 0;

    this.crud.retrieve(this.crud.models.PARTICIPANT, participantId)
    .subscribe(
      (res: Participant) => {

        // Instead of assigning 'this.participant = res', call the
        // constructor of the Participant model to have access
        // to the 'sortQuestionResponsesArray()' method defined
        // in that class.
        this.participant =
          new Participant(
            res.name,
            res.age,
            res.gender,
            res.ethnicGroup,
            res.educationLevel,
            res.experiment_id,
            null,
            null,
            res.id,
            res.questionresponses);

        // Sort the question responses by the relative order
        // of their IDs
        if(this.participant.questionresponses)
          this.participant.sortQuestionResponsesArray();
      },
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    );
  }

  /**
   * Method that sets the current question
   * @param questionIndex the index of the new current question.
   */
  setCurrQuestion(questionIndex) {

    this.currQuestionIndex = questionIndex;
  }

  /**
   * Method that returns the YouTube video URL
   * of the currently chosen video. The URL
   * string is sanitized before being returned.
   */
  getCurrYouTubeVideoURL() {

    if(this.participant 
      && this.participant.questionresponses 
      && this.currQuestionIndex < this.participant.questionresponses.length){

      // Retrieve the YouTube video ID of the currently chosen video
      const videoId = this.participant.questionresponses[this.currQuestionIndex].videoId;

      // To be able to set this YouTube link in the corresponding iframe's [src] attribute,
      // the URL string must be sanitized. This prevents Cross-Site Scripting Security bugs
      // and makes it safe to use such URLs in DOM contexts.
      return this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + videoId);
    }
  }

  /**
   * Method that takes you to the list of question responses
   * of this experiment.
   */
  retrieveQuestionResponses() {

    this.router.navigate(['experiments/' + this.experimentId + '/responses']);
  }
}
