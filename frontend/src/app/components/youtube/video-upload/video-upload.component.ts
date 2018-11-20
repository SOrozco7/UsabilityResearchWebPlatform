import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../../services/video.service';
import { ScriptService } from '../../../services/script.service';
import { ActivatedRoute, Router } from '@angular/router';
import '../../../../assets/js/upload_video.js';
import { QuestionResponse } from '../../../models/question-response';

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
    private router: Router) { }

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
    }
  }

  /**
   * Method that retrieves an experiment.
   * @param id the id of the experiment to retrieve
   */
  retrieveExperiment(id: number) {
    this.router.navigate(['experiments/' + id]);
  }
}
