import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../../services/video.service';
import { ScriptService } from '../../../services/script.service';
import '../../../../assets/js/upload_video.js';

declare var uploadToYouTube: any;

@Component({
  selector: 'app-video-upload',
  templateUrl: './video-upload.component.html',
  styleUrls: ['./video-upload.component.css']
})
export class VideoUploadComponent implements OnInit {

  videosArr: Blob[];

  constructor(private videoService: VideoService, private scriptService: ScriptService) { }

  ngOnInit() {

    this.videoService.currentVideosArray.subscribe(videosArr => this.videosArr = videosArr);

    this.scriptService.load('googleAjax', 'jsClient', 'uploadVideo', 'corsUpload').then(data => {
      console.log('script loaded ', data);
  }).catch(error => console.log(error));

    if(this.videosArr != null){

      console.log("From VideoUploadComponent -> videosArr.length = " + this.videosArr.length);
      console.log("From VideoUploadComponent -> console.log(Object.values(this.videosArr[0])) = " + console.log(Object.values(this.videosArr[0])));
    }
  }

  callYouTubeUpload(){

    if(this.videosArr != null){

      new uploadToYouTube(this.videosArr[0]);
    }
  }

}
