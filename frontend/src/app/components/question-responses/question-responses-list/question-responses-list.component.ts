import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CrudService } from '../../../services/crud.service';
import { Participant } from '../../../models/participant';

@Component({
  selector: 'app-question-responses-list',
  templateUrl: './question-responses-list.component.html',
  styleUrls: ['./question-responses-list.component.css']
})
export class QuestionResponsesListComponent implements OnInit {

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

    // List only the question responses of the current experiment
    const data = {
      experiment_id: String(this.experimentId)
    };
    
    const searchParams = new URLSearchParams(data);

    this.crud.list(this.crud.models.PARTICIPANT, searchParams)
    .subscribe(
      (res: Participant[]) => {
        console.log(res);
        this.arrParticipants = res;
        // this.experiment = res;
        // console.log(this.experiment.user_id);
      },
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    );
  }

  /**
   * Method that takes you to the section to retrieve a specific 
   * participant's responses.
   */
  retrieveResponses(participantId){

    this.router.navigate(['experiments/' + this.experimentId + '/responses/participant/' + participantId]);
  }
}
