import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';


const routes = [
  { path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'report', pathMatch: 'prefix'},
      { path: 'report', loadChildren: '../report/report.module#ReportModule' }
    ]
  }
];
/**
 * This module is responsible only for dashboard routes
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
/**
 * App routing class
 */
export class LayoutRoutesModule { }
