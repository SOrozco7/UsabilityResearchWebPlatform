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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ExperimentListComponent,
    ExperimentCreateComponent,
    ExperimentRetrieveComponent
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
