import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 

// Components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/authentication/login/login.component';

// Services
import { AuthService } from './services/auth.service';
import { CrudService } from './services/crud.service';
import { ErrorHandlerService } from './services/error-handler.service';
import { ExperimentsListComponent } from './components/experiments/experiments-list/experiments-list.component';
import { ExperimentCreateComponent } from './components/experiments/experiment-create/experiment-create.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ExperimentsListComponent,
    ExperimentCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AuthService, CrudService, ErrorHandlerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
