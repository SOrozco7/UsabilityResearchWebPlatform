import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, CanActivate } from '@angular/router';

// Guards
import { AuthGuard } from './guards/auth.guard';

// Components
import { LoginComponent } from './components/authentication/login/login.component';
import { LogoutComponent } from './components/authentication/logout/logout.component';
import { ExperimentListComponent } from './components/experiments/experiment-list/experiment-list.component';
import { ExperimentCreateComponent } from './components/experiments/experiment-create/experiment-create.component';
import { ExperimentRetrieveComponent } from './components/experiments/experiment-retrieve/experiment-retrieve.component';
import { ExperimentUpdateComponent } from './components/experiments/experiment-update/experiment-update.component';
import { ExperimentDeleteComponent } from './components/experiments/experiment-delete/experiment-delete.component';
import { QuestionnaireListComponent } from './components/questionnaires/questionnaire-list/questionnaire-list.component';
import { QuestionnaireListForExperimentComponent } from './components/questionnaires/questionnaire-list-for-experiment/questionnaire-list-for-experiment.component';  // tslint:disable-line:max-line-length
import { QuestionnaireAddToExperimentComponent } from './components/questionnaires/questionnaire-add-to-experiment/questionnaire-add-to-experiment.component';  // tslint:disable-line:max-line-length
import { QuestionnaireFillComponent } from './components/questionnaires/questionnaire-fill/questionnaire-fill.component';
import { SignupComponent } from './components/signup/signup.component';
import { ExperimentRunComponent } from './components/experiments/experiment-run/experiment-run.component';
import { RecordRtcComponent } from './components/record-rtc/record-rtc.component';

const routes: Routes = [

  // General
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  // Experiments
  {
    path: 'experiments',
    component: ExperimentListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'experiments/create',
    component: ExperimentCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'experiments/:id',
    component: ExperimentRetrieveComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'experiments/update/:id',
    component: ExperimentUpdateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'experiments/delete/:id',
    component: ExperimentDeleteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'experiments/run/:id',
    component: ExperimentRunComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'questionnaires',
    component: QuestionnaireListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'experiments/:id/questionnaires',
    component: QuestionnaireListForExperimentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'experiments/:experiment_id/questionnaires/:questionnaire_id/fill',
    component: QuestionnaireFillComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'experiments/:id/addquestionnaire',
    component: QuestionnaireAddToExperimentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'recordrtc',
    component: RecordRtcComponent
  },
  // All other routes
  {
    path: '**',
    redirectTo: 'experiments'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
