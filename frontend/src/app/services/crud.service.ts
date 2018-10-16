import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable()
export class CrudService {
  URL: string;
  headers: HttpHeaders;
  models = {

    USER: 'users',
    EXPERIMENT: 'experiments',
    QUESTIONNAIRE: 'questionnaires',
    BODYPART : 'bodyPart'
  };

  constructor(private auth: AuthService, private http: HttpClient) {
    this.URL = environment.baseUrl + 'api';

    if (this.auth.isLoggedIn()) {
      this.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.auth.getToken()
      });
    } else {
      this.headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
    }
  }

  list(model: string) {
    return this.http.get(
      this.URL + '/' + model,
      {
        headers: this.headers
      }
    );
  }

  retrieve(model: string, id: any) {
    return this.http.get(
      this.URL + '/' + model + '/' + id,
      {
        headers: this.headers
      }
    );
  }

  registerUser(body: any) {
    return this.http.post(
      this.URL + '/' + this.models.USER,
      body,
      {
        headers: this.headers
      }
    );
  }

  confirmUser(uuid: String) {
    return this.http.get(
      this.URL + '/users/confirm/' + uuid
    );
  }

  create(model: string, body: any) {

    return this.http.post(this.URL + '/' + model,
      body,
      {
        headers: this.headers
      }
    );
  }

  update(model: string, id: any, body: any) {

    return this.http.put(
      this.URL + '/' + model + '/' + id,
      body,
      {
        headers: this.headers
      }
    );
  }

  delete(model: string, id: any) {
    return this.http.delete(
      this.URL + '/' + model + '/' + id,
      {
        headers: this.headers
      }
    );
  }
}
