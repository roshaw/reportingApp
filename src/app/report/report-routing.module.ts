import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {ReportListComponent} from './report-list/report-list.component';
import {ReportEditComponent} from './report-edit/report-edit.component';

const routes = [
  { path: '',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'prefix'},
      { path: 'list',
        component: ReportListComponent
      },
      {
        path: 'new',
        component: ReportEditComponent
      },
      {
        path: 'edit/:reportId',
        component: ReportEditComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
