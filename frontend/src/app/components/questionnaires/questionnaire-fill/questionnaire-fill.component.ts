import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { QuestionnaireQuestion } from '../../../models/questionnaire-question';
import { Questionnaire } from '../../../models/questionnaire';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Participant } from '../../../models/participant';
import { QuestionnaireResponse } from '../../../models/questionnaire-response';
import { QuestionnaireQuestionResponse } from '../../../models/questionnaire-question-response';
import { flatMap } from 'rxjs/operators';

class Question_Answer {
  constructor(public text: string, public answerValue: number, public questionId: number) {}
}

// This component is for a participant to fill out a particular questionnaire.
@Component({
  selector: 'app-questionnaire-fill',
  templateUrl: './questionnaire-fill.component.html',
  styleUrls: ['./questionnaire-fill.component.css']
})



export class QuestionnaireFillComponent implements OnInit {

  questionnaire: Questionnaire;
  questions: QuestionnaireQuestion[];
  // Functions as a form for each question.
  question_answers: Question_Answer[] = [];
  answerValues: number[];
  id: number;
  errorMessage: string;

  constructor(private errorHandler: ErrorHandlerService, private crud: CrudService, private router: Router, private auth: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get("questionnaire_id"));
    this.getQuestionnaire();
  }

  getQuestionnaire() {
    this.crud.retrieve(this.crud.models.QUESTIONNAIRE, this.id)
      .subscribe(
        (res: Questionnaire) => {
          console.log(res);
          this.questionnaire = res;
          this.questions = res.questions;
          for (let question of this.questions) {
            this.question_answers.push(new Question_Answer(question.text, 0, question.id));
          }
          console.log(this.questions);
          this.answerValues = Array(this.questions.length);
        },
        (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        }
      )
  }
  customTrackBy(index: number, obj: any): any {
    console.log('index:', index, 'value:', obj);
    return index;
  }

  radioCheck(index: number, value: number) {
    this.question_answers[index].answerValue = value;
  }

  submitResponses() {
    // Check that all of the questions have been properly answered.
    for (let question of this.question_answers) {
      if (question.answerValue === 0) {
        console.log("ERR: At least one of the questions has not been answered");
        this.errorMessage = "Error: At least one of the questions has not been answered.";
        return;
      }
    }
    this.errorMessage = undefined;

    // Create a new participant.
    // TODO: Delegate participant creation to another section and simply reference here.
    const participant = new Participant(parseInt(this.route.snapshot.paramMap.get("experiment_id")));
    //let createdParticipant: Participant;
    this.crud.create(this.crud.models.PARTICIPANT, participant)
      .subscribe((createdParticipant: Participant) => {
        this.crud.create(this.crud.models.QUESTIONNAIRE_RESPONSE, 
          new QuestionnaireResponse(createdParticipant.id, null, this.id))
          .subscribe((createdResponse: QuestionnaireResponse) => {
            for (let question of this.question_answers) {
              this.crud.create(this.crud.models.QUESTIONNAIRE_QUESTION_RESPONSE, 
                new QuestionnaireQuestionResponse(question.answerValue, createdResponse.id, question.questionId))
                .subscribe(
                  (res: QuestionnaireQuestionResponse) => {
                    console.log("Successfully created:", res);
                  },
                  (err: HttpErrorResponse) => {
                    this.errorHandler.handleError(err);
                  }
                );
                }
              },
              (err: HttpErrorResponse) => {
                this.errorHandler.handleError(err);
              }
          );
        },
        (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        }
      );
    console.log("submitResponses done.")
  }
}
