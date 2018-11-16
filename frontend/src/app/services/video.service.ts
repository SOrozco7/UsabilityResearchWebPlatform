import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private videosSource =  new BehaviorSubject<Object[]>(null);
  currentVideosArray = this.videosSource.asObservable();

  constructor() { }

  changeVideosArray(videosArr: Object[]){

    this.videosSource.next(videosArr);
  }
}
