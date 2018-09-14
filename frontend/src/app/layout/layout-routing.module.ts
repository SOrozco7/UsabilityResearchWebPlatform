import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { ExperimentRetrieveComponent } from './experiments/experiment-retrieve/experiment-retrieve.component';
import { ExperimentListComponent } from './experiments/experiment-list/experiment-list.component';
import { ExperimentCreateComponent } from './experiments/experiment-create/experiment-create.component';
import { AuthGuard } from '../guards/auth.guard';
import { CrudService } from '../services/crud.service';
import { LogService } from '../services/log.service';
import { ExperimentUpdateComponent } from './experiments/experiment-update/experiment-update.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'experiments/create', loadChildren: './charts/charts.module#ChartsModule', component: ExperimentCreateComponent, canActivate: [AuthGuard] },
            { path: 'experiments', loadChildren: './blank-page/blank-page.module#BlankPageModule', component: ExperimentListComponent, canActivate: [AuthGuard]},
            { path: 'experiments/:id', loadChildren: './blank-page/blank-page.module#BlankPageModule', component: ExperimentRetrieveComponent, canActivate: [AuthGuard]},
            { path: 'experiments/update/:id', loadChildren: './form/form.module#FormModule', component: ExperimentUpdateComponent, canActivate: [AuthGuard]},
            { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'experiment', loadChildren: './blank-page/blank-page.module#BlankPageModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [AuthGuard, CrudService, LogService]
})
export class LayoutRoutingModule {}
