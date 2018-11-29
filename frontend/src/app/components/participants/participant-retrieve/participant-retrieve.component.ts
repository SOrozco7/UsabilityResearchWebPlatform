import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Participant } from '../../../models/participant';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '../../../services/error-handler.service';

@Component({
  selector: 'app-participant-retrieve',
  templateUrl: './participant-retrieve.component.html',
  styleUrls: ['./participant-retrieve.component.css']
})
export class ParticipantRetrieveComponent implements OnInit {

  participant: Participant;
  experimentId: number;

  constructor(
    private errorHandler: ErrorHandlerService,
    private crud: CrudService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.experimentId = parseInt(this.route.snapshot.paramMap.get('experiment_id'), 10);
    const participantId = parseInt(this.route.snapshot.paramMap.get('participant_id'), 10);

    this.crud.retrieve(this.crud.models.PARTICIPANT, participantId)
      .subscribe(
        (res: Participant) => {
          this.participant = res;
        },
        (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        }
      );
  }

  listParticipants() {

    this.router.navigate(['experiments/' + this.experimentId + '/participants/']);
  }

  deleteParticipant(participantId) {

    this.router.navigate(['experiments/' + this.experimentId + '/participants/delete/' + participantId]);
  }

  updateParticipant(participantId) {

    this.router.navigate(['experiments/' + this.experimentId + '/participants/' + participantId + '/update/']);
  }
}
