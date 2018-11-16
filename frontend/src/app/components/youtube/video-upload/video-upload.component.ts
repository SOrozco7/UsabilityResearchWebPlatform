import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../../services/video.service';
import { ScriptService } from '../../../services/script.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-video-upload',
  templateUrl: './video-upload.component.html',
  styleUrls: ['./video-upload.component.css']
})
export class VideoUploadComponent implements OnInit {

  videosArr: Object[];

  constructor(private videoService: VideoService, private scriptService: ScriptService) { }

  ngOnInit() {

    this.videoService.currentVideosArray.subscribe(videosArr => this.videosArr = videosArr);

    this.scriptService.load('googleAjax', 'jsClient').then(data => {
      console.log('script loaded ', data);
  }).catch(error => console.log(error));

    if(this.videosArr != null)
      console.log("From VideoUploadComponent -> videosArr.length = " + this.videosArr.length);
  }

}
