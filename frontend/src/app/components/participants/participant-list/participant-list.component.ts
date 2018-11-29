import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Participant } from '../../../models/participant';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '../../../services/error-handler.service';

@Component({
  selector: 'app-participant-list',
  templateUrl: './participant-list.component.html',
  styleUrls: ['./participant-list.component.css']
})
export class ParticipantListComponent implements OnInit {

  arrParticipants: Participant[];
  experimentId: number;

  constructor(
    private errorHandler: ErrorHandlerService,
    private crud: CrudService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.experimentId = parseInt(this.route.snapshot.paramMap.get('id'), 10);

    // List only the participants of the current experiment
    const searchParams = new URLSearchParams();
    searchParams.set('experiment_id', this.experimentId.toString());

    this.crud.list(this.crud.models.PARTICIPANT, searchParams)
      .subscribe(
        (res: Participant[]) => {
          this.arrParticipants = res;
        },
        (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        }
      );
  }

  retrieveExperiment() {

    this.router.navigate(['experiments/' + this.experimentId]);
  }
}
