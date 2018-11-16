import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';

declare var require: any;

const recordRTCDependency = require('recordrtc/RecordRTC.min');

@Component({
  selector: 'app-record-rtc',
  templateUrl: './record-rtc.component.html',
  styleUrls: ['./record-rtc.component.css']
})
export class RecordRtcComponent implements AfterViewInit {

  private stream: MediaStream;
  recordRTC: any;
  @Output() videoEvent = new EventEmitter<any>();

  @ViewChild('video') video;

  constructor() {

    // Start the recording automatically.
    this.startRecording();
  }

  sendVideo(){

    console.log("Sending video!");
    console.log(this.recordRTC);
    // Emit the video to the parent component
    this.videoEvent.emit(this.recordRTC);
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
    this.recordRTC = recordRTCDependency(stream, options);
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

    console.log("Video stopped!!");

    // Call the method that sends the video to the parent component
    this.sendVideo();
  }

  download() {

    if (this.recordRTC != null) {

      this.recordRTC.save('video.webm');
    }
  }
}
