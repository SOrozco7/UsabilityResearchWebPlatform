import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { Questionnaire } from '../../../models/questionnaire';

@Component({
  selector: 'app-questionnaire-create',
  templateUrl: './questionnaire-create.component.html',
  styleUrls: ['./questionnaire-create.component.css']
})
export class QuestionnaireCreateComponent implements OnInit {

  currentUserId: string;
  questionnaireForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    scaleSize: new FormControl('', [Validators.required]),
    isPublic: new FormControl('', [Validators.required]),
    questions: new FormControl('', [Validators.required]),
  });

  constructor(
    private errorHandler: ErrorHandlerService,
    private crud: CrudService,
    private router: Router,
    private auth: AuthService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.currentUserId = this.auth.getUser().id;
    this.questionnaireForm.get('isPublic').setValue('False');
  }

  getNameErrorMessage() {
    if (this.questionnaireForm.get('name').hasError('required')) {
      return 'You must enter a name';
    }
    return '';
  }

  getDescriptionErrorMessage() {
    if (this.questionnaireForm.get('name').hasError('required')) {
      return 'You must enter a description';
    }
    return '';
  }

  onSubmit() {
    const questionnaire = {
      name: this.questionnaireForm.get('name').value,
      description: this.questionnaireForm.get('description').value,
      scaleSize: this.questionnaireForm.get('scaleSize').value,
      isPublic: this.questionnaireForm.get('isPublic').value,
      user_id: this.currentUserId
    };
    const questions = this.parseQuestions();
    // Create the questionnaire first.
    this.crud.create(this.crud.models.QUESTIONNAIRE, questionnaire)
      .subscribe(
        (res: Questionnaire) => {
          // Create the questionnaire questions in bulk.
          const questionnaireQuestions = questions.map(questionString => {
            return {
              text: questionString,
              questionnaire_id: res.id
            };
          });
          this.crud.bulkCreate(this.crud.models.QUESTIONNAIRE_QUESTION, {
            questionnairequestions: questionnaireQuestions
          })
            .subscribe(
              (bulkCreateResponse: any) => {
                console.log(bulkCreateResponse);
                this.router.navigate(['questionnaires']);
              },
              (err: HttpErrorResponse) => {
                this.errorHandler.handleError(err);
              }
            );
        },
        (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        });
  }

  parseQuestions() {
    // Split the textarea into individual lines, and filter out any blank lines.
    return this.questionnaireForm.get('questions').value.split(/\r\n|\r|\n/).filter(question => question.length > 0);
  }
}
