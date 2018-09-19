import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as moment from 'moment';

@Injectable()
export class AuthService {
  URL: string;
  headers: HttpHeaders;


  constructor(private http: HttpClient) {
    this.URL = environment.baseUrl + 'api';
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  // Make the post request with the id and password provided, if successful, sets session data
  login(id: string, password: string) {
    let user;
    let body = {
      user_id: id,
      password: password
    }

    return this.http.post(
      this.URL + '/login',
      body,
      { headers: this.headers }
    );
  }

  // Sets session data with the login response
  setSession(res) {
    const expiresAt = moment().add(res.expirationTime, 'second');

    localStorage.setItem('token', res.token);
    localStorage.setItem('user', JSON.stringify(res.user));
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  // Delete session data
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('expires_at');
  }

  // Returns true if the the token exists and has not expired
  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isRoot() {
    if (this.isLoggedIn()) {
      return this.getUser().system_role == "root";
    }
    else {
      return false;
    }
  }

  // Get the moment expiration time
  getExpiration() {
    return moment(JSON.parse(localStorage.getItem('expires_at')));
  }

  // get the logged-in user
  getUser() {
    return JSON.parse(localStorage.getItem('user'))
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
