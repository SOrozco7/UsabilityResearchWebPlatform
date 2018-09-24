import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, CanActivate } from '@angular/router';

// Guards
import { AuthGuard } from './guards/auth.guard';

// Components
import { LoginComponent } from './components/authentication/login/login.component';
import { ExperimentsListComponent } from './components/experiments/experiments-list/experiments-list.component';

const routes: Routes = [

  // General
  { path:'login', component: LoginComponent},

  // Experiments
  { path: 'experiments', component: ExperimentsListComponent },
  // All other routes
  { path: '**', redirectTo: '' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
