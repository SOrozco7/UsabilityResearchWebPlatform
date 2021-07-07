import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Participant } from '../../../models/participant';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '../../../services/error-handler.service';

@Component({
  selector: 'app-participant-create',
  templateUrl: './participant-create.component.html',
  styleUrls: ['./participant-create.component.css']
})
export class ParticipantCreateComponent implements OnInit {

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
    this.experimentId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.participant.experiment_id = this.experimentId;
  }

  createParticipant() {

    this.crud.create(this.crud.models.PARTICIPANT, this.participant)
      .subscribe(
        (res: Participant) => {
          this.participant = res;
          this.listParticipants();
        },
        (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        }
      );
  }

  listParticipants() {

    this.router.navigate(['experiments/' + this.experimentId + '/participants/']);
  }
}
