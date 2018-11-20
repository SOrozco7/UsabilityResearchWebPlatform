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
    console.log("this.questionResponsesArr.length = " + this.questionResponsesArr.length);
  }

  setQuestionResponseArray(){

    if(this.questionResponsesArr != null){

      for(let i = 0; i < this.questionResponsesArr.length; i++) {

        this.questionResponsesArr[i].videoId = "YOUTUBE_VIDEO_ID";
      }
    }
  }

  callYouTubeUpload(){

    if(this.videosArr != null){

      for(let i = 0; i < this.videosArr.length; i++) {
        
        new uploadToYouTube(this.videosArr[i]);
      }
    }
  }

}
