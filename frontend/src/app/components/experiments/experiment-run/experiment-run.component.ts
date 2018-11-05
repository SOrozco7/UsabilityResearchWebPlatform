import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Experiment } from '../../../models/experiment';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { RecordRTCComponent } from '../../record-rtc/record-rtc.component';
import { Question } from '../../../models/question';

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
  experimentId: number;

  constructor(
    private errorHandler: ErrorHandlerService,
    private crud: CrudService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.experimentQuestions = null;
    this.currentQuestion = null;
    this.experimentId = parseInt(this.route.snapshot.paramMap.get('id'), 10);

    // Get the list of the experiment's questions by retrieving the experiment
    this.crud.retrieve(this.crud.models.EXPERIMENT, this.experimentId)
    .subscribe(
      (res: Experiment) => {
        console.log(res);
        
        // Assign the array of questions
        // this.experimentQuestions = res.questions;

        // Use an index of the current question and the amount
        // of questions in this experiment to control the display
        // of the questions
        this.currQuestionIndex = 0;

        if(this.experimentQuestions != null){

          this.questionCount = this.experimentQuestions.length;
        }

        this.assignCurrentlyDisplayedQuestion();
      },
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    );
  }

  /**
   * Method to assign the current question based on the
   * array of the experiment's question and the current 
   * question's index.
   */
  assignCurrentlyDisplayedQuestion(){

    if(this.experimentQuestions != null){
      
      this.currentQuestion = this.experimentQuestions[this.currQuestionIndex];
    }
  }

  /**
   * Method to change the current question based on the
   * array of the experiment's question and the current 
   * question's index. 
   */
  changeCurrentlyDisplayedQuestion(){

    // If there is at least one more question left
    if(this.currQuestionIndex < this.questionCount - 1){

      this.currQuestionIndex++;
      this.assignCurrentlyDisplayedQuestion();
    }
    else{

      // Just finish the experiment
      this.finishExperiment();
    }
  }

  /**
   * Method to finish the experiment and return to 
   * the ExperiementRetrieveComponent.
   */
  finishExperiment(){

    this.retrieveExperiment(this.experimentId);
  }

  /**
   * Method that retrieves an experiment.
   * @param id the id of the experiment to retrieve
   */
  retrieveExperiment(id: number) {
    this.router.navigate(['experiments/' + id]);
  }
}
