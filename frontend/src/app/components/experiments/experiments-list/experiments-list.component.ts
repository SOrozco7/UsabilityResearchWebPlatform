import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { Experiment } from '../../../models/experiment';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '../../../services/error-handler.service';

@Component({
  selector: 'app-experiments-list',
  templateUrl: './experiments-list.component.html',
  styleUrls: ['./experiments-list.component.css']
})
export class ExperimentsListComponent implements OnInit {

  experiments: Experiment[];
  constructor(private crud: CrudService, private router: Router, private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.crud.list(this.crud.models.EXPERIMENT)
      .subscribe( (res: Experiment[]) => {
        console.log(res);
        this.experiments = res;
      }, (error) => {
        this.errorHandler.handleError(error);
      })
  }
}
