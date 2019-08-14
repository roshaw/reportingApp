import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportListComponent } from './report-list/report-list.component';
import { ReportEditComponent } from './report-edit/report-edit.component';
import { BasicInfoComponent } from './tabs/basic-info/basic-info.component';
import { AlegationComponent } from './tabs/alegation/alegation.component';
import {ReportRoutingModule} from './report-routing.module';
import {AppSharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [ReportListComponent, ReportEditComponent, BasicInfoComponent, AlegationComponent],
  imports: [
    CommonModule,
    AppSharedModule,
    ReportRoutingModule
  ]
})
export class ReportModule { }
