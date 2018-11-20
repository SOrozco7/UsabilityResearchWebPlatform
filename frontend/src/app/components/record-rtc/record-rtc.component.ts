import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { NgxNotificationService } from 'ngx-notification';

declare var require: any;
const recordRTCVideo = require('recordrtc/RecordRTC.min');

@Component({
  selector: 'app-record-rtc',
  templateUrl: './record-rtc.component.html',
  styleUrls: ['./record-rtc.component.css'],
})
export class RecordRtcComponent implements AfterViewInit {

  private stream: MediaStream;
  recordRTC: any;
  @Output() videoEvent = new EventEmitter<Blob>();

  @ViewChild('video') video;

  constructor(private ngxNotificationService: NgxNotificationService) {

    // Start the recording automatically.
    this.startRecording();
  }

  ngAfterViewInit() {
    // set the initial state of the video
    const video: HTMLVideoElement = this.video.nativeElement;
    video.muted = false;
    video.controls = true;
    video.autoplay = false;
  }

  toggleControls() {
    const video: HTMLVideoElement = this.video.nativeElement;
    video.muted = !video.muted;
    video.controls = !video.controls;
    video.autoplay = !video.autoplay;
  }

  successCallback(stream: MediaStream) {

    const options = {
      mimeType: 'video/webm', // or video/webm\;codecs=h264 or video/webm\;codecs=vp9
      audioBitsPerSecond: 1024000,
      videoBitsPerSecond: 1024000,
      bitsPerSecond: 1024000 // if this line is provided, skip above two
    };
    this.stream = stream;
    this.recordRTC = recordRTCVideo(stream, options);
    this.recordRTC.startRecording();
    const video: HTMLVideoElement = this.video.nativeElement;
    video.src = window.URL.createObjectURL(stream);
    this.toggleControls();
  }

  errorCallback() {
    // handle error here
  }

  processVideo(audioVideoWebMURL) {
    const video: HTMLVideoElement = this.video.nativeElement;
    const recordRTC = this.recordRTC;
    video.src = audioVideoWebMURL;
    console.log('123 video.src = ' + video.src);
    this.toggleControls();
    const recordedBlob = recordRTC.getBlob();
    recordRTC.getDataURL(function (dataURL) { });
  }

  startRecording() {
    const mediaConstraints = {
      video: {
        width: 1280,
        height: 720
      }, audio: true
    };
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));
  }

  stopRecording() {

    const recordRTC = this.recordRTC;
    recordRTC.stopRecording(this.processVideo.bind(this));
    const stream = this.stream;
    stream.getAudioTracks().forEach(track => track.stop());
    stream.getVideoTracks().forEach(track => track.stop());

    console.log('Video stopped!!');
  }

  sendToParentComponent() {

    if (this.recordRTC != null) {

      console.log(this.recordRTC.getBlob());
      this.videoEvent.emit(this.recordRTC.getBlob());

      this.sendNotification('The video was successfully saved!', 'success', 'bottom-left');
    }
  }

  download() {

    if (this.recordRTC != null) {

      this.recordRTC.save('video.webm');
    }
  }

  sendNotification(message, color, position) {

    this.ngxNotificationService.sendMessage(message, color, position);
  }
}
