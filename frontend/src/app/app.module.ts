import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';

// Components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/authentication/login/login.component';

// Services
import { AuthService } from './services/auth.service';
import { CrudService } from './services/crud.service';
import { ErrorHandlerService } from './services/error-handler.service';
import { ExperimentListComponent } from './components/experiments/experiment-list/experiment-list.component';
import { ExperimentCreateComponent } from './components/experiments/experiment-create/experiment-create.component';
import { ExperimentRetrieveComponent } from './components/experiments/experiment-retrieve/experiment-retrieve.component';
import { ExperimentUpdateComponent } from './components/experiments/experiment-update/experiment-update.component';
import { ExperimentDeleteComponent } from './components/experiments/experiment-delete/experiment-delete.component';
import { QuestionnaireListComponent } from './components/questionnaires/questionnaire-list/questionnaire-list.component';
import { LogoutComponent } from './components/authentication/logout/logout.component';
import { NavComponent } from './components/nav/nav.component';
import { QuestionnaireListForExperimentComponent } from './components/questionnaires/questionnaire-list-for-experiment/questionnaire-list-for-experiment.component';  // tslint:disable-line:max-line-length
import { SignupComponent } from './components/signup/signup.component';
import { QuestionnaireFillComponent } from './components/questionnaires/questionnaire-fill/questionnaire-fill.component';
import { QuestionnaireAddToExperimentComponent } from './components/questionnaires/questionnaire-add-to-experiment/questionnaire-add-to-experiment.component'; // tslint:disable-line:max-line-length
import { QuestionCreateComponent } from './components/questions/question-create/question-create.component';
import { QuestionListComponent } from './components/questions/question-list/question-list.component';
import { QuestionRetrieveComponent } from './components/questions/question-retrieve/question-retrieve.component';
import { QuestionUpdateComponent } from './components/questions/question-update/question-update.component';
import { QuestionDeleteComponent } from './components/questions/question-delete/question-delete.component';  // tslint:disable-line:max-line-length

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ExperimentListComponent,
    ExperimentCreateComponent,
    ExperimentRetrieveComponent,
    ExperimentUpdateComponent,
    ExperimentDeleteComponent,
    QuestionnaireListComponent,
    LogoutComponent,
    NavComponent,
    QuestionnaireListForExperimentComponent,
    SignupComponent,
    QuestionnaireFillComponent,
    QuestionnaireAddToExperimentComponent,
    QuestionCreateComponent,
    QuestionListComponent,
    QuestionRetrieveComponent,
    QuestionUpdateComponent,
    QuestionDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AuthService, CrudService, ErrorHandlerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
