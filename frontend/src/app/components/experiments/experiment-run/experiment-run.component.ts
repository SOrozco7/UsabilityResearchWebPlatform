import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Experiment } from '../../../models/experiment';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { RecordRtcComponent } from '../../record-rtc/record-rtc.component';
import { Question } from '../../../models/question';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { VideoService } from '../../../services/video.service';

@Component({
  selector: 'app-experiment-run',
  templateUrl: './experiment-run.component.html',
  styleUrls: ['./experiment-run.component.css']
})
export class ExperimentRunComponent implements OnInit {

  experimentQuestions: Question[];
  currQuestionIndex: number;
  currentQuestion: Question;
  questionCount: number;
  // This array contains the videos of the participant's answers
  videosArr: Blob[];
  experimentId: number;

  @ViewChild(RecordRtcComponent) child:RecordRtcComponent;

  constructor(
    private errorHandler: ErrorHandlerService,
    private crud: CrudService,
    private router: Router,
    private route: ActivatedRoute,
    private videoService: VideoService) { }

  ngOnInit() {

    this.videoService.currentVideosArray.subscribe(videosArr => this.videosArr = videosArr);

    this.experimentQuestions = null;
    this.currentQuestion = null;

    // Use an index of the current question and the amount
    // of questions in this experiment to control the display
    // of the questions
    this.currQuestionIndex = 0;

    // Set the default value
    this.questionCount = 0;
    this.experimentId = parseInt(this.route.snapshot.paramMap.get('id'), 10);

    // Get the list of the experiment's questions by retrieving the experiment
    this.crud.retrieve(this.crud.models.EXPERIMENT, this.experimentId)
      .subscribe(
        (res: Experiment) => {
          console.log(res);

          // Assign the array of questions
          this.experimentQuestions = res.questions;

          if (this.experimentQuestions != null) {

            this.questionCount = this.experimentQuestions.length;
            this.videosArr = [];
          }

          this.assignCurrentlyDisplayedQuestion();
        },
        (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        }
      );
  }

  /**
   * Method to update the videos array across the ExperimentRunComponent, 
   * the VideoService and the VideoUploadComponent.
   */
  updateVideosArray() {

    this.videoService.changeVideosArray(this.videosArr);
  }

  receiveVideo($event) {

    console.log("1 this.videosArr.length = " + this.videosArr.length);
    
    this.videosArr[this.currQuestionIndex] = $event;
    console.log("Video received! -> ");
    console.log(this.videosArr[this.currQuestionIndex]);
    this.updateVideosArray();
    console.log("2 this.videosArr.length = " + this.videosArr.length);
  }

  /**
   * Method to assign the current question based on the
   * array of the experiment's question and the current
   * question's index.
   */
  assignCurrentlyDisplayedQuestion() {

    if (this.experimentQuestions != null) {

      this.currentQuestion = this.experimentQuestions[this.currQuestionIndex];
    }
  }

  /**
   * Method to change the current question based on the
   * array of the experiment's question and the current
   * question's index.
   */
  changeCurrentlyDisplayedQuestion() {

    this.child.stopRecording();
    this.currQuestionIndex++;

    console.log("this.questionCount = " + this.questionCount);
    console.log("this.currQuestionIndex = " + this.currQuestionIndex);

    // If there is at least one more question left
    if (this.currQuestionIndex <= this.questionCount - 1) {

      this.assignCurrentlyDisplayedQuestion();
      this.child.startRecording();
    } else {

      // Just finish the experiment
      this.finishExperiment();
    }
  }

  /**
   * Method to finish the experiment and return to
   * the ExperiementRetrieveComponent.
   */
  finishExperiment() {

    // this.retrieveExperiment(this.experimentId);
    this.uploadVideos(this.experimentId, 1);
  }

  /**
   * Method that retrieves an experiment.
   * @param id the id of the experiment to retrieve
   */
  retrieveExperiment(id: number) {
    this.router.navigate(['experiments/' + id]);
  }

  uploadVideos(experimentId, participantId){

    this.router.navigate(['experiments/' + experimentId + '/participant/' + participantId + '/video/upload']);
  }
}
