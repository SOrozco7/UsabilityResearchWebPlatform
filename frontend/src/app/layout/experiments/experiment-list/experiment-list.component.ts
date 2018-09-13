import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Experiment } from '../../../models/experiment';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user';
import { ErrorHandlerService } from '../../../services/error-handler.service';

@Component({
  selector: 'app-experiment-list',
  templateUrl: './experiment-list.component.html',
  styleUrls: ['./experiment-list.component.scss']
})
export class ExperimentListComponent implements OnInit {

  experiments: Experiment[];

  constructor(private errorHandler:ErrorHandlerService, private crud:CrudService, private router:Router, private auth:AuthService) { }

  ngOnInit() {
    
      this.getAllExperiments();
    
  }

  getAllExperiments(){
    this.crud.list(this.crud.models.EXPERIMENT)
    .subscribe(
      (res:Experiment[])=>{
        console.log(res);
        this.experiments = res;
      },
      (err:HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    )
  }

  getUserExperiments(){
    this.crud.retrieve(this.crud.models.USER, this.auth.getUser().id)
    .subscribe(
      (res:User)=>{
        console.log(res.experiments);
        this.experiments = res.experiments;
      },
      (err:HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    )
  }

  createExperiment(){
    this.router.navigate(['experiments/create']);
  }

  updateExperiment(updateID: number){
    this.router.navigate(['experiments/update/'+updateID]);
  }

  retrieveExperiment(retrieveID: number){
    this.router.navigate(['experiments/'+retrieveID]);
  }

  deleteExperiment(id: number){
    console.log("Deleting")
    this.crud.delete(this.crud.models.EXPERIMENT, id)
    .subscribe(
      (res:Response) => {
        this.errorHandler.showInformativeMessage('Experiment successfully deleted.');
        let x = 0;
        for(let experiment of this.experiments){
          if(experiment.id == id){

            this.experiments.splice(x, 1);
          }
          x++;
        }
      },
      (err:HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    )
  }
}