import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../../services/video.service';
import { ScriptService } from '../../../services/script.service';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private videoService: VideoService, private scriptService: ScriptService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.videoService.currentVideosArray.subscribe(videosArr => this.videosArr = videosArr);
    this.videoService.currentQuestionResponsesArray
      .subscribe(questionResponsesArr => this.questionResponsesArr = questionResponsesArr);

    this.scriptService.load('googleAjax', 'jsClient', 'uploadVideo', 'corsUpload').then(data => {
      console.log('script loaded ', data);
    }).catch(error => console.log(error));  

    this.experimentId = parseInt(this.route.snapshot.paramMap.get('experiment_id'), 10);
    this.participantId = parseInt(this.route.snapshot.paramMap.get('participant_id'), 10);
    this.setQuestionResponseArray();
  }

  setQuestionResponseArray(){

    if(this.questionResponsesArr != null){

      for(let i = 0; i < this.questionResponsesArr.length; i++) {

        this.questionResponsesArr[i].videoId = "";
      }
    }
  }

  callYouTubeUpload(){

    if(this.videosArr != null){

      for(let i = 0; i < this.videosArr.length; i++) {

        const questionId = this.questionResponsesArr[i].question_id;

        const videoName = "experiment_" + this.experimentId
          + "_question_" + questionId + "_participant_" + this.participantId;

        const videoDescription = "Video corresponding to the response of participant " + this.participantId
          + " of the question " + questionId + " of the experiment " + this.experimentId + ".\n\nVideo uploaded by GestureWeb.";
        
        new uploadToYouTube(this.videosArr[i], questionId, videoName, videoDescription);
      }
    }
  }

}
