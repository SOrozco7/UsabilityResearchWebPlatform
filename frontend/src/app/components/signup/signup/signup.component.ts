import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { CrudService } from '../../../services/crud.service';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  user: User;
  passwordConfirmation: string;

  constructor(private errorHandler: ErrorHandlerService, private crud: CrudService, private auth: AuthService, public router: Router) { }

  ngOnInit() {

    if (this.auth.isLoggedIn()) {
      this.router.navigate(['']);
    }

    this.user = new User('', '', '', '', '', null, null, null);
    this.passwordConfirmation = '';
  }

  signup() {

    if (this.validate()) {

      this.crud.create(this.crud.models.USER, this.user)
        .subscribe(
          (res: User) => {

            // console.log(user);
            this.user = res;
            this.errorHandler.showInformativeMessage('Your account was successfully created. You can now login.');
            this.router.navigate(['/login']);
          },
          (err: HttpErrorResponse) => {
            this.errorHandler.handleError(err);
          }
        );

    }

    return false;
  }

  validate() {

    if (!this.user.id || !this.user.password || !this.passwordConfirmation) {

      this.errorHandler.showErrorMessage('You must introduce your email address, password and password confirmation.');
      return false;
    } else if (!this.passwordWasConfirmed()) {

      this.errorHandler.showErrorMessage('The password was not correctly confirmed.');
      return false;
    } else {
      return true;
    }
  }

  passwordWasConfirmed() {

    return this.user.password === this.passwordConfirmation;
  }
}
