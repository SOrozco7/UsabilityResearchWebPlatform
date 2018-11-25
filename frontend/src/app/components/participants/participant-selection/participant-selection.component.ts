import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CrudService } from '../../../services/crud.service';
import { Participant } from '../../../models/participant';

@Component({
  selector: 'app-participant-selection',
  templateUrl: './participant-selection.component.html',
  styleUrls: ['./participant-selection.component.css']
})
export class ParticipantSelectionComponent implements OnInit {

  arrParticipants: Participant[];
  experimentId: number;

  constructor(
    private route: ActivatedRoute,
    private errorHandler: ErrorHandlerService,
    private crud: CrudService,
    private router: Router,
  ) { }

  ngOnInit() {

    this.experimentId = parseInt(this.route.snapshot.paramMap.get('id'), 10);

    // List only the participants of the current experiment
    const searchParams = new URLSearchParams();
    searchParams.set('experiment_id', this.experimentId.toString());

    this.crud.list(this.crud.models.PARTICIPANT, searchParams)
      .subscribe(
        (res: Participant[]) => {
          this.filterParticipants(res);
        },
        (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        }
      );
  }

  /**
   * Method that adds to the arrParticipants attribute of this component
   * only those participants of this experiment who do not have responses yet.
   * @param participants the array of participants from the Participant.List
   * request.
   */
  filterParticipants(participants){

    this.arrParticipants = [];
    let j = 0;

    for (let i = 0; i < participants.length; i++) {

      if (!participants[i].questionresponses 
        || participants[i].questionresponses.length == 0) {

        this.arrParticipants[j++] = participants[i];
      }
    }
  }

  /**
   * Method that takes you back to the experiment home page
   */
  retrieveExperiment() {

    this.router.navigate(['experiments/' + this.experimentId]);
  }

  /**
   * Method that takes you to the ExperimentRunComponent
   * @param participantId the id of the participant of the experiment selected
   * for the experiment run
   */
  runExperiment(participantId){

    this.router.navigate(['experiments/run/' + this.experimentId + '/participants/' + participantId]);
  }
}
