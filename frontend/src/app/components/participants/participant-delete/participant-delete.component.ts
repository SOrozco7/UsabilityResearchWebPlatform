import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { ErrorHandlerService } from '../../../services/error-handler.service';

@Component({
  selector: 'app-participant-delete',
  templateUrl: './participant-delete.component.html',
  styleUrls: ['./participant-delete.component.css']
})
export class ParticipantDeleteComponent implements OnInit {

  experimentId: number; 

  constructor(
    private errorHandler: ErrorHandlerService,
    private crud: CrudService,
    private router: Router,
    private auth: AuthService,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.experimentId = parseInt(this.route.snapshot.paramMap.get('experiment_id'), 10);
    const participantId = parseInt(this.route.snapshot.paramMap.get('participant_id'), 10);

    console.log('Deleting');
    this.crud.delete(this.crud.models.PARTICIPANT, participantId)
    .subscribe(
      (res: Response) => {
        this.errorHandler.showInformativeMessage('Successfully deleted participant.');
        
        this.listParticipants();
      },
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    );
  }

  listParticipants(){

    this.router.navigate(['experiments/' + this.experimentId + '/participants/']);
  }

}
