import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, CanActivate } from '@angular/router';

// Guards
import { AuthGuard } from './guards/auth.guard';

// Components
// User
import { LoginComponent } from './components/authentication/login/login.component';
import { LogoutComponent } from './components/authentication/logout/logout.component';
// Experiment
import { ExperimentListComponent } from './components/experiments/experiment-list/experiment-list.component';
import { ExperimentCreateComponent } from './components/experiments/experiment-create/experiment-create.component';
import { ExperimentRetrieveComponent } from './components/experiments/experiment-retrieve/experiment-retrieve.component';
import { ExperimentUpdateComponent } from './components/experiments/experiment-update/experiment-update.component';
import { ExperimentDeleteComponent } from './components/experiments/experiment-delete/experiment-delete.component';
import { ExperimentRunComponent } from './components/experiments/experiment-run/experiment-run.component';
// Participant
import { ParticipantSelectionComponent } from './components/participants/participant-selection/participant-selection.component'; // tslint:disable-line:max-line-length
import { ParticipantListComponent } from './components/participants/participant-list/participant-list.component'; // tslint:disable-line:max-line-length
import { ParticipantRetrieveComponent } from './components/participants/participant-retrieve/participant-retrieve.component'; // tslint:disable-line:max-line-length
import { ParticipantCreateComponent } from './components/participants/participant-create/participant-create.component'; // tslint:disable-line:max-line-length
import { ParticipantDeleteComponent } from './components/participants/participant-delete/participant-delete.component';
// QuestionResponses
import { QuestionResponsesListComponent } from './components/question-responses/question-responses-list/question-responses-list.component';
import { QuestionResponsesRetrieveComponent } from './components/question-responses/question-responses-retrieve/question-responses-retrieve.component'; // tslint:disable-line:max-line-length
// Questionnaire
import { QuestionnaireListComponent } from './components/questionnaires/questionnaire-list/questionnaire-list.component';
import { QuestionnaireCreateComponent } from './components/questionnaires/questionnaire-create/questionnaire-create.component';
import { QuestionnaireListForExperimentComponent } from './components/questionnaires/questionnaire-list-for-experiment/questionnaire-list-for-experiment.component';  // tslint:disable-line:max-line-length
import { QuestionnaireAddToExperimentComponent } from './components/questionnaires/questionnaire-add-to-experiment/questionnaire-add-to-experiment.component';  // tslint:disable-line:max-line-length
import { QuestionnaireFillComponent } from './components/questionnaires/questionnaire-fill/questionnaire-fill.component';
import { QuestionnaireRetrieveComponent } from './components/questionnaires/questionnaire-retrieve/questionnaire-retrieve.component'; // tslint:disable-line:max-line-length
import { QuestionnaireQuestionCreateComponent } from './components/questionnaire-questions/questionnaire-question-create/questionnaire-question-create.component'; // tslint:disable-line:max-line-length

import { SignupComponent } from './components/signup/signup.component';
import { QuestionCreateComponent } from './components/questions/question-create/question-create.component';
import { QuestionRetrieveComponent } from './components/questions/question-retrieve/question-retrieve.component';
import { QuestionListComponent } from './components/questions/question-list/question-list.component';
import { QuestionUpdateComponent } from './components/questions/question-update/question-update.component';
import { QuestionDeleteComponent } from './components/questions/question-delete/question-delete.component';
// Video
import { VideoUploadComponent } from './components/youtube/video-upload/video-upload.component';

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
    path: 'experiments/:id/participants/create',
    component: ParticipantCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'experiments/:experiment_id/participants/delete/:participant_id',
    component: ParticipantDeleteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'experiments/:id/participants/select',
    component: ParticipantSelectionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'experiments/:id/participants',
    component: ParticipantListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'experiments/:experiment_id/participants/:participant_id',
    component: ParticipantRetrieveComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'experiments/:id/questions/create',
    component: QuestionCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'experiments/:experiment_id/questions/:question_id',
    component: QuestionRetrieveComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'experiments/:id/questions',
    component: QuestionListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'experiments/:experiment_id/questions/update/:question_id',
    component: QuestionUpdateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'experiments/:experiment_id/questions/delete/:question_id',
    component: QuestionDeleteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'experiments/run/:experiment_id/participants/:participant_id',
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
    path: 'questionnaires/create',
    component: QuestionnaireCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'questionnaires/:id',
    component: QuestionnaireRetrieveComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'questionnaires/:id/questions/create',
    component: QuestionnaireQuestionCreateComponent,
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
    path: 'experiments/:experiment_id/participants/:participant_id/video/upload',
    component: VideoUploadComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'experiments/:id/responses',
    component: QuestionResponsesListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'experiments/:experiment_id/responses/participants/:participant_id',
    component: QuestionResponsesRetrieveComponent,
    canActivate: [AuthGuard]
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
