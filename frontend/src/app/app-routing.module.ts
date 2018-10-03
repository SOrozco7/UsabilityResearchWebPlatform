import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, CanActivate } from '@angular/router';

// Guards
import { AuthGuard } from './guards/auth.guard';

// Components
import { LoginComponent } from './components/authentication/login/login.component';
import { ExperimentListComponent } from './components/experiments/experiment-list/experiment-list.component';
import { ExperimentCreateComponent } from './components/experiments/experiment-create/experiment-create.component';
import { ExperimentRetrieveComponent } from './components/experiments/experiment-retrieve/experiment-retrieve.component';

const routes: Routes = [

  // General
  { 
    path:'login', 
    component: LoginComponent
  },

  // Experiments
  { 
    path: 'experiments', 
    component: ExperimentListComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'experiments/:id', 
    component: ExperimentRetrieveComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'experiments/create', 
    component: ExperimentCreateComponent, 
    canActivate: [AuthGuard] 
  },
  // All other routes
  { 
    path: '**', 
    redirectTo: 'experiments' 
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
