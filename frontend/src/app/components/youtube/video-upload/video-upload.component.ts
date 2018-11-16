import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../../services/video.service';

@Component({
  selector: 'app-video-upload',
  templateUrl: './video-upload.component.html',
  styleUrls: ['./video-upload.component.css']
})
export class VideoUploadComponent implements OnInit {

  videosArr: Object[];

  constructor(private videoService: VideoService) { }

  ngOnInit() {

    this.videoService.currentVideosArray.subscribe(videosArr => this.videosArr = videosArr);

    if(this.videosArr != null)
      console.log("From VideoUploadComponent -> videosArr.length = " + this.videosArr.length);
  }

}
