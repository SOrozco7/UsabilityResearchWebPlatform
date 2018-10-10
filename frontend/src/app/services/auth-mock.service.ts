import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthMockService {

  constructor() {

    const userObj = {

      'user': {
        'id': 'danperez@gmail.com',
      }
    };

    localStorage.setItem('user', JSON.stringify(userObj.user));
  }
}
