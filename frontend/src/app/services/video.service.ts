import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { QuestionResponse } from '../models/question-response';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private videosSource =  new BehaviorSubject<Blob[]>(null);
  currentVideosArray = this.videosSource.asObservable();

  private questionResponseSource = new BehaviorSubject<QuestionResponse[]>(null);
  currentQuestionResponsesArray = this.questionResponseSource.asObservable();

  constructor() { }

  changeVideosArray(videosArr: Blob[]){

    this.videosSource.next(videosArr);
  }

  changeQuestionResponsesArray(questionResponsesArr: QuestionResponse[]){

    this.questionResponseSource.next(questionResponsesArr);
  }
}
