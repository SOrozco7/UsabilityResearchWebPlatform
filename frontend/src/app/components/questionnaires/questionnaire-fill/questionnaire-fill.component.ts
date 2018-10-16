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

class QuestionAnswer {
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
  questionAnswers: QuestionAnswer[] = [];
  // Array which holds the answers selected for each question in the corresponding index.
  answerValues: number[];
  // Dummy array whose length equals the questionnaire's scale size; only used for the ngFor loop.
  answerOptions: number[];
  id: number;
  errorMessage: string;

  constructor(
    private errorHandler: ErrorHandlerService,
    private crud: CrudService,
    private router: Router,
    private auth: AuthService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('questionnaire_id'), 10);
    this.getQuestionnaire();
  }

  getQuestionnaire() {
    this.crud.retrieve(this.crud.models.QUESTIONNAIRE, this.id)
      .subscribe(
        (res: Questionnaire) => {
          console.log(res);
          this.questionnaire = res;
          this.questions = res.questions;
          for (const question of this.questions) {
            this.questionAnswers.push(new QuestionAnswer(question.text, 0, question.id));
          }
          this.answerOptions = Array(this.questionnaire.scaleSize);
          console.log(this.questions);
          this.answerValues = Array(this.questions.length);
        },
        (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        }
      );
  }

  radioCheck(index: number, value: number) {
    // Modifies the chosen option for a particular question.
    this.questionAnswers[index].answerValue = value;
  }

  submitResponses() {
    // Check that all of the questions have been properly answered.
    for (const question of this.questionAnswers) {
      if (question.answerValue === 0) {
        console.log('ERR: At least one of the questions has not been answered');
        this.errorMessage = 'Error: At least one of the questions has not been answered.';
        return;
      }
    }
    this.errorMessage = undefined;

    // Create a new participant.
    // TODO: Delegate participant creation to another section and simply reference here.
    const participant = new Participant(parseInt(this.route.snapshot.paramMap.get('experiment_id'), 10));
    // let createdParticipant: Participant;
    this.crud.create(this.crud.models.PARTICIPANT, participant)
      .subscribe((createdParticipant: Participant) => {
        this.crud.create(this.crud.models.QUESTIONNAIRE_RESPONSE,
          new QuestionnaireResponse(createdParticipant.id, null, this.id))
          .subscribe((createdResponse: QuestionnaireResponse) => {
            for (const question of this.questionAnswers) {
              this.crud.create(this.crud.models.QUESTIONNAIRE_QUESTION_RESPONSE,
                new QuestionnaireQuestionResponse(question.answerValue, createdResponse.id, question.questionId))
                .subscribe(
                  (res: QuestionnaireQuestionResponse) => {
                    console.log('Successfully created:', res);
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
  }
}
