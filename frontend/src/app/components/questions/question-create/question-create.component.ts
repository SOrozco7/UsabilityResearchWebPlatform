import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/models/question';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../../models/user';
import { AuthService } from '../../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '../../../services/error-handler.service';

@Component({
  selector: 'app-question-create',
  templateUrl: './question-create.component.html',
  styleUrls: ['./question-create.component.css']
})
export class QuestionCreateComponent implements OnInit {

  question: Question;
  id: number;
  initialImageFile: File = null;
  finalImageFile: File = null;
  initialSoundFile: File = null;
  finalSoundFile: File = null;

  initialImageUrl: string = null;
  finalImageUrl: string = null;
  initialSoundUrl: string = null;
  finalSoundUrl: string = null;

  constructor(
    private errorHandler: ErrorHandlerService,
    private crud: CrudService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService) { }

  ngOnInit() {
    this.question = new Question(null, null, null, null, null, null, null);
    this.question.experiment_id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
  }

  createQuestion() {
    // Validate that we have the urls (for the images at least)
    if (!this.finalImageUrl || !this.initialImageUrl) {
      console.log('Error: missing one or more of the image files');
      return;
    }
    this.question.initialImage = this.initialImageUrl;
    this.question.finalImage = this.finalImageUrl;
    this.question.initialSound = this.initialSoundUrl;
    this.question.finalSound = this.finalSoundUrl;
    if (this.validate()) {
      this.crud.create(this.crud.models.QUESTION, this.question)
        .subscribe(
          (res: Question) => {
            console.log(res);
            this.question = res;

            this.retrieveExperiment();
          },
          (err: HttpErrorResponse) => {
            this.errorHandler.handleError(err);
          }
        );
    }
  }

  validate() {
    if (!this.question.text || (!this.question.initialImage && !this.question.finalImage)) {
      this.errorHandler.showErrorMessage('You must enter at least include the text of a question and a multimedia element.');
      return false;
    } else {
      return true;
    }
  }

  retrieveExperiment() {

    this.router.navigate(['experiments/' + this.question.experiment_id]);
  }

  onInitialImageSelected(event) {
    this.initialImageFile = <File>event.target.files[0];
  }
  onFinalImageSelected(event) {
    this.finalImageFile = <File>event.target.files[0];
  }
  onInitialSoundSelected(event) {
    this.initialSoundFile = <File>event.target.files[0];
  }
  onFinalSoundSelected(event) {
    this.finalSoundFile = <File>event.target.files[0];
  }

  onUploadInitialImage() {
    const fd = new FormData();
    fd.append('file', this.initialImageFile);
    this.crud.uploadFile(fd)
      .subscribe((res: any) => {
          console.log('file successfully uploaded');
          this.initialImageUrl = res.imageUrl;
        }, err => {
          console.log('Error: ' + err);
        }
        );
  }

  onUploadFinalImage() {
    const fd = new FormData();
    fd.append('file', this.finalImageFile);
    this.crud.uploadFile(fd)
      .subscribe((res: any) => {
          console.log('file successfully uploaded');
          this.finalImageUrl = res.imageUrl;
        }, err => {
          console.log('Error: ' + err);
        }
        );
  }

  onUploadInitialSound() {
    const fd = new FormData();
    fd.append('file', this.initialSoundFile);
    this.crud.uploadFile(fd)
      .subscribe((res: any) => {
          console.log('file successfully uploaded');
          this.initialSoundUrl = res.imageUrl;
        }, err => {
          console.log('Error: ' + err);
        }
        );
  }

  onUploadFinalSound() {
    const fd = new FormData();
    fd.append('file', this.finalSoundFile);
    this.crud.uploadFile(fd)
      .subscribe((res: any) => {
          console.log('file successfully uploaded');
          this.finalSoundUrl = res.imageUrl;
        }, err => {
          console.log('Error: ' + err);
        }
        );
  }
}
