import { Injectable, ErrorHandler } from '@angular/core';
// import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorHandlerService {

  // constructor(private snackBar: MatSnackBar) { }
  constructor() { }

  handleError(err) {

    if (err.error && err.error.message) {
      this.showErrorMessage(err.error.message);
    } else if (err.error && err.error.errors && err.error.errors[0].message) {
      this.showErrorMessage(err.error.errors[0].message);
    } else if (err.message) {
      this.showErrorMessage(err.message);
    } else {
      this.showErrorMessage('There was a problem. Try again later.');
    }

  }

  showErrorMessage(message) {
    // let snackBarErr = this.snackBar.open("ERROR: " + message, 'OK', {
    //   duration: 3500,
    // });
  }

  showInformativeMessage(message) {
    // let snackBarErr = this.snackBar.open(message, 'OK', {
    //   duration: 3500,
    // });
  }

}
