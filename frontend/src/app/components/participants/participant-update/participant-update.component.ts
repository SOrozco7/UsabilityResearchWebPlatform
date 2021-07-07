import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Participant } from '../../../models/participant';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '../../../services/error-handler.service';

@Component({
  selector: 'app-participant-update',
  templateUrl: './participant-update.component.html',
  styleUrls: ['./participant-update.component.css']
})
export class ParticipantUpdateComponent implements OnInit {

  participant: Participant;
  experimentId: number;

  ethnicGroups = [
    'Native American',
    'Alaska Native',
    'White American',
    'Aryan',
    'Hispanic',
    'African American',
    'Asian American',
    'Other'
  ];

  genders = [
    'Male',
    'Female'
  ];

  educationLevels = [
    'High School',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'PhD',
    'Other'
  ];

  ethnicGroupSelected: any;
  genderSelected: any;
  educationLevelSelected: any;

  onGenderSelected(event) {
    console.log(event); // option value will be sent as event
    this.participant.gender = event;
  }

  onEthnicGroupSelected(event) {
    console.log(event); // option value will be sent as event
    this.participant.ethnicGroup = event;
  }

  onEducationLevelSelected(event) {
    console.log(event); // option value will be sent as event
    this.participant.educationLevel = event;
  }

  constructor(
    private errorHandler: ErrorHandlerService,
    private crud: CrudService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.participant = new Participant('', 20, '', '', '', -1, null, null, -1, null);
    this.participant.id = parseInt(this.route.snapshot.paramMap.get('participant_id'), 10);
    this.experimentId = parseInt(this.route.snapshot.paramMap.get('experiment_id'), 10);
    this.participant.experiment_id = this.experimentId;

    this.crud.retrieve(this.crud.models.PARTICIPANT, this.participant.id)
      .subscribe(
        (res: Participant) => {
          console.log(res);
          this.participant = res;
          this.ethnicGroupSelected = 'AASDASD';
        },
        (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        }
      );
  }

  updateParticipant() {

    if (this.validate()) {

      this.crud.update(this.crud.models.PARTICIPANT, this.participant.id, this.participant)
        .subscribe(
          (res: Participant) => {
            this.participant = res;
            this.retrieveParticipant();
          },
          (err: HttpErrorResponse) => {
            this.errorHandler.handleError(err);
          }
        );
    }
  }

  validate() {
    if (!this.participant.name && !this.participant.age && !this.participant.gender && !this.participant.educationLevel) {
      this.errorHandler.showErrorMessage('You must enter a valid value in all fields.');
      return false;
    } else {
      return true;
    }
  }

  retrieveParticipant() {

    this.router.navigate(['experiments/' + this.experimentId + '/participants/' + this.participant.id]);
  }
}
