import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class LogService {
  URL:string;
  headers: HttpHeaders;
  Models: {};

  constructor(private auth:AuthService, private http:HttpClient) {
    this.URL = 'http://localhost:8000/api';
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': this.auth.getToken()
    });
  }

  record(model:string, operation:string) {
    let body = {
      query: model + " " + operation,
      user_id: this.auth.getUser().id
    }

    return this.http.post(
      this.URL + '/logs',
      body,
      {headers: this.headers}
    );
  }
}