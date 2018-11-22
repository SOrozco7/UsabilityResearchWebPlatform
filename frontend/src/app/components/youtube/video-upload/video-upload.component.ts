import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../../services/video.service';
import { ScriptService } from '../../../services/script.service';
import { ActivatedRoute, Router } from '@angular/router';
import '../../../../assets/js/upload_video.js';
import { QuestionResponse } from '../../../models/question-response';
import { NgxNotificationService } from 'ngx-notification';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

declare var uploadToYouTube: any;

@Component({
  selector: 'app-video-upload',
  templateUrl: './video-upload.component.html',
  styleUrls: ['./video-upload.component.css']
})
export class VideoUploadComponent implements OnInit {

  videosArr: Blob[];
  questionResponsesArr: QuestionResponse[];
  experimentId: number;
  participantId: number;
  uploadButtonDisabled: boolean;

  constructor(
    private videoService: VideoService,
    private scriptService: ScriptService,
    private route: ActivatedRoute,
    private router: Router,
    private ngxNotificationService: NgxNotificationService,
    private crud: CrudService,
    private errorHandler: ErrorHandlerService,
    @Inject(DOCUMENT) document) { }

  ngOnInit() {

    this.uploadButtonDisabled = false;

    this.videoService.currentVideosArray.subscribe(videosArr => this.videosArr = videosArr);
    this.videoService.currentQuestionResponsesArray
      .subscribe(questionResponsesArr => this.questionResponsesArr = questionResponsesArr);

    this.scriptService.load('googleAjax', 'jsClient', 'uploadVideo', 'corsUpload').then(data => {
      console.log('script loaded ', data);
    }).catch(error => console.log(error));

    this.experimentId = parseInt(this.route.snapshot.paramMap.get('experiment_id'), 10);
    this.participantId = parseInt(this.route.snapshot.paramMap.get('participant_id'), 10);
  }

  /**
   * Method that calls the YouTube upload for all videos from the current participant's
   * responses to the experiment's questions.
   */
  callYouTubeUpload() {

    if (this.videosArr != null) {

      for (let i = 0; i < this.videosArr.length; i++) {

        const questionId = this.questionResponsesArr[i].question_id;

        // Assign the name of the video according to the experiment id, the question
        // id and the participant id.
        const videoName = 'experiment' + this.experimentId
          + '_question' + questionId + '_participant' + this.participantId;

        const videoDescription = 'Video corresponding to the response of participant ' + this.participantId
          + ' of the question ' + questionId + ' of the experiment ' + this.experimentId + '.\n\nVideo uploaded by GestureWeb.';

        // Call the upload. This executes a function in 'assets/js/upload_video.js'
        const upload = new uploadToYouTube(this.videosArr[i], questionId, videoName, videoDescription);
      }

      this.uploadButtonDisabled = true;
      this.sendNotification('The videos are being uploaded to YouTube', 'success', 'bottom-right');
    }
  }

  /**
   * Method that inserts to the database the participant's question responses
   */
  createQuestionResponses() {

    // First, assign the video IDs to the QuestionResponse instances
    // in the questionResponsesArr. As JQuery updated those strings,
    // after the YouTube uploads finished, before this call to
    // 'assignQuestionResponses()', the attribute 'videoId' of each
    // QuestionResponse instance in that array is empty.
    this.assignQuestionResponses();

    // Once the video IDs have been set, everything's ready for
    // inserting the question responses to the database.

    for (let i = 0; i < this.questionResponsesArr.length; i++) {

      this.crud.create(this.crud.models.QUESTION_RESPONSE, this.questionResponsesArr[i])
        .subscribe(
          (res: QuestionResponse) => {

            this.questionResponsesArr[i] = res;
          },
          (err: HttpErrorResponse) => {
            this.errorHandler.handleError(err);
          }
        );
    }
  }

  /**
   * Method that accesses the DOM to update the 'videoId' property
   * of the QuestionResponse instances in the questionResponsesArr array.
   * This update is necessary because those HTML fields were dinamically
   * updated by JQuery using the legacy YouTube Data API code; the regular
   * Angular double binding does not take those updated values by default.
   */
  assignQuestionResponses() {

    for (let i = 0; i < this.questionResponsesArr.length; i++) {

      // The HTML fields that we're trying to access have the following id's:
      //    video-id_<QUESTION_ID>
      //    e.g. video-id_124
      const questionId = this.questionResponsesArr[i].question_id;
      this.questionResponsesArr[i].videoId = document.getElementById('video-id_' + questionId).innerText;
    }
  }

  /**
   * Method that retrieves an experiment.
   * @param id the id of the experiment to retrieve
   */
  retrieveExperiment(id: number) {
    this.router.navigate(['experiments/' + id]);
  }

  sendNotification(message, color, position) {

    this.ngxNotificationService.sendMessage(message, color, position);
  }
}
