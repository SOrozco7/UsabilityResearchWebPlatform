import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from '@angular/forms';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { ExperimentRetrieveComponent } from './experiments/experiment-retrieve/experiment-retrieve.component';
import { ExperimentListComponent } from './experiments/experiment-list/experiment-list.component';
import { ExperimentUpdateComponent } from './experiments/experiment-update/experiment-update.component';

import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        FormsModule,
        NgbDropdownModule.forRoot()
    ],
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent, ExperimentRetrieveComponent, ExperimentListComponent, ExperimentCreateComponent, ExperimentUpdateComponent]
})
export class LayoutModule {}
